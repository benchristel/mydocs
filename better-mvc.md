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