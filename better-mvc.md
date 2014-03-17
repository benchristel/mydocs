# A Generalized Application Design Paradigm

## Avatar classes

Avatar classes interface between a controller and the model layer on behalf of a user. Their purpose is to allow easy pseudo-integration testing of the full-stack backend behavior. The reason for this is that controllers are often annoying to test, since they are actuated by events or http requests or whatever. When using Avatars, the controller should be a very thin layer -- basically just calling a method on the Avatar, and passing the data it returns to the view.

## User permissions

Within an Avatar class, data from the model is not passed directly to the controller. Instead, it's wrapped in a presenter that formats the data and removes sensitive fields depending on the user or role that is requesting it. Ideally, there is no default or standard format for a model's data; the presenter fully decouples the controller and view from the persistence layer. The advantage of this is that it forces the designer to consider which fields a particular user role or API should have access to, and how those fields should be formatted.

The presenter class is also responsible for determining the user's write permissions, and mediating between the requested action and the model. Every action triggered on an Avatar class thus has at least 2 components, and probably more like 4:

- WHO are you?
- WHAT are you doing?

And the other two:

- WHOM are you acting upon?
- HOW? (data, additional params, etc.)

Actions can have side effects, of course. Those are represented by CreateCallbackStrategy or UpdateCallbackStrategy classes, which are invoked after a create or update action and perform the necessary actions. The benefit of having these is that the avatar can choose a different strategy class to use for the callbacks. One of the earliest and most obvious benefits comes when testing, when you usually want to stub out external service calls. Giving the Avatar a callback strategy that does nothing is a straightforward way to do that.

What's left in the model? The model is responsible for:

- communicating with the ORM layer
- providing an easy-to-use interface for accessing its data -- for example, converting a [timestamp, zone] tuple into a DateTimeWithZone object.
- managing workflow-like state transitions.
- providing access to its associations.

Any list of the model's responsibilities is necessarily incomplete, but stuff that's similar to these four categories belongs in the model. Just keep in mind that the model should be COMPLETELY agnostic of the rest of the application and any external services. It should contain no business logic related to anything outside that model. The model class should be pluggable into any application that uses the same concepts.

```ruby
@perspective = Perspective.new(avatar)
@posts.map! { |post| PostArbiter.new(perspective).apply_hat(post) }
```

## Idea 2

Maybe responsibilities should be split up into Models, Views, Controllers, Presenters, and Actions.

**Models** are responsible for interfacing with an RDBMS via an ORM layer -- deserializing, decrypting, and/or formatting stored data into in-memory objects, managing the lifecycle of database objects, and managing associations with other models. In a Rails app, they should consist of ActiveRecord boilerplate and very little else. They should not contain business logic, though they may contain business knowledge (in the form of state workflows or query scopes). They should only be aware of other models. They may contain standard formatting code -- for example, a model may know how to convert itself to a generic JSON payload.

**Actions** are classes that represent things that happen in the app. An example might be a `Users::CommentOnPost` action. Action classes should be namespaced by the name of the entity initiating them. In a Rails app, this would mean that all the actions a User can take would be defined under `app/actions/users`, and namespaced into the `Users` module. Actions can be taken by non-user entities, or invoked by other actions. For example, `Posts::PublishToSocialMedia` might be invoked by the `Users::PublishPosts` action as a sort of after-update callback for `Post`. Or there might be a `Workers::FlagSpam` action that fires on a regular basis by a scheduled job. Actions are the heavy hitters in terms of business logic and code complexity, but that's balanced by the fact that there are so many of them, and each has a clearly-defined responsibility.

**Presenters** groom data before it leaves the backend service, whether it's going out in response to a request, or as part of a request the service is making to an external API. This might involve such things as converting DateTime objects to a Unix epoch timestamp (useful if Javascript is going to be consuming the data), or removing fields that the external party shouldn't have access to.

**Views** tie the abstract output of presenters to a concrete user interface. On a phone app, that might be GUI objects. For a web app, it might be an HTML template that's rendered serverside and sent to the client. For a single-page webapp, View code might be vestigial or nonexistent if all the interesting data is passed between the browser and server via Ajax.

**Controllers** tie everything else together. They are responsible for taking a routed request's URI, params, body, and headers, and doing any of the following:

- performing an Action
- creating new records via one or more Models
- querying one or more Models
- wrapping model objects in Presenters
- choosing a View to render

Thus, the dependency hierarchy looks like this:

```
Controllers-----\
  |     | \      \
 Views  |  \    Actions
  |     |   \    / 
 Presenters  \  /
     \        \/
      \------Models
```

The restrictions can be summarized:

- Views depend only on Presenters
- Presenters and Actions depend only on Models
- Models depend only on other Models

### What's up with Actions?

IT'S JUST FUNCTIONAL PROGRAMMING, but better. If you're in an OO language like Ruby, which has closures but not real first-class functions, this might seem kind of weird. Why define a whole class for every action in the app? Isn't that basically just fancy talk for having a bunch of methods in the global namespace?

The fact is, having a class for each action has real benefits over a bunch of global methods. A few of them:

- Classes have inheritance. It's easy to define a family of actions that are variations on a theme without spaghettifying your code.
- Classes have instances, and instances have a lifespan. You can create an action instance and, instead of using it immediately, pass it to another method that knows what to do with it. Or you can fill in some of the parameters of an action object and then hand it off to someone else to fill in the rest of them. This is more flexible than the pure functional-programming equivalent of using a higher-order function to create a lambda that can be handed off, because the parameters can be provided in any order.
- Classes allow intuitive caching of return values. If you have a bunch of global methods that each perform some action, you can't easily cache their return values without creating cache invalidation headaches. With action objects, it's obvious that cached values are valid for the lifetime of the object. There's no need to invalidate the cache, because action objects are disposable.

Here's the other interesting thing about actions: you're already using them. Constantly. Much of the time you have a classname that ends in -er or -or, you're really looking at an action: `FeePricingCalculator`, `AvatarUploader`, `SpamDetector` could be `CalculateFeePricing`, `UploadAvatar`, and `DetectSpam`. Ideally, I think these would be named for gerunds: `FeePricingCalculation`, `AvatarUploading`, `SpamDetection`. The problem is that English gerunds are too often misconstrued as other forms, which is why I advocate writing all your code in Sindarin.

The naming isn't so important, though. What is important is that you should be using Action classes way more than you probably are. Use them for everything. If your users or product managers have a concept of something they can do or your service can do to affect the state of the universe, that concept should correspond one-to-one with an Action class. Ideally, someone with no knowledge of your codebase should be able to go to one product meeting, take some key verb phrases that get thrown around there, and grep your codebase for the camel-cased versions of those phrases to see the code that turns that talk into real pancake sauce.
