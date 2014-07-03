# Version 4

A WIP boardgame

## Guiding Principles

- **Aesthetics:** the physical components of the game should be pleasing; the game mechanics should lend themselves to an aesthetic presentation.
- **Narrative:** each play of the game should tell a different story. Players should feel an emotional attachment to the characters and events in the game. They should reminisce about the game after it ends. They should be focused on resolving situations, not gaming mechanics. The character and player know the same set of things about the game world.
- **Challenge:** the game should have strategic depth. No single strategy should dominate. Players should feel that creative plays, adaptation to circumstances, and long-term planning are rewarded.
- **Competition:** victory or defeat should never be certain. Players should feel that the winner earned victory.
- **Abnegation:** The barrier to entry should be low; it should be possible to play (though probably not to win) with a minimum of mental effort. Players should always know what their options are; they should never have to choose between more than a handful of options. It should be obvious from glancing at the board what the gamestate is. The load on players' working memory should be small. N.B. this does not mean the game has to be easy—e.g. Go actually excels at abnegation by this metric, since you can "play" by just playing on any open intersection at random.
- **Social interaction:** players should be engaged during others' turns. Negotiation should be vital to the game.
- **Social cohesion:** it should be conceivable that gaming groups would form primarily to play this game.
- **Brevity:** The game should not outstay its welcome. Playtime should be adjustable by slight tweaks to the rules, goal states, or initial conditions. 20-30 minutes per player is probably about right.

## User Stories

- As a Player,
  - I want to have cooperative and competitive goals that conflict, so I can bluff and negotiate with the other players.
  - I want to play a game that tells a unique and exciting story each time, so I can enjoy replaying the game and reminiscing about past plays.
  - I want managable strategic and tactical decision points, so I am engaged but not overwhelmed.
- As a Spectator, I want dramatic irony, so the game is entertaining and suspenseful.

### Review Targets

"There's no single dominant strategy. There's no formula you can apply every time and always win. You have to deal with what the game throws at you."

"Most of the rules are on cards. The core engine is pretty simple, but it provides a lot of hooks for complex abilities and events, and interaction between them. It can be a bit annoying because you have to read a lot of card text, but if you read it out loud it adds to the immersion and interactivity."

"One thing this game does really well is let you take informed risks that make thematic sense. Encounters don't feel random, nor are they totally predictable. If you wander into a graveyard, you'll probably be dealing with undead of some kind, but you have to actually go there to find out."

"Combat only takes a few seconds, but there's a surprising amount of room for tactics."



## Thematic Concepts

- The game spans several generations. Young player characters grow up, receive training, choose a class, and eventually succeed their mentors. Characters can grow old and retire. Death is permanent.
- Some concept of faction, character class, magic school, or alignment
- Wandering monsters or other NPC encounters that can involve combat, trade, or diplomacy.

## Mechanical Concepts

- **Everyone is a DM:** Players trade off the responsibility of making life interesting for each other. Maybe there's some bidding mechanic that lets players put a price on control of the NPCs in each encounter. Conflict and negotiation should arise from the players' conflicting goals, not from some dumb AI built into the game.
- **Levels are Loot:** Spells, abilities and items are all treasure that you can gain from encounters. The more powerful abilities build upon weaker ones, so a concept of character class emerges. 
- **Options are Health:** [When you're out of ointment, you're out of time](http://xkcd.com/68/). Having options means you're alive; if you have no options, you're dead. The things you can do are represented by the cards in your deck. You die iff your deck runs out.
- **Basic Items are Boring:** No one wants to kill a bunch of monsters and be rewarded with a "sword". That's boring. Instead, you get bonuses that you can apply to certain weapon types. This represents finding either enchanted scrolls that you can use to buff one of your items, or finding already-enchanted or finely-crafted weapons. You don't have to actually find or buy a "sword" or "bow" card to use those weapon types -- it's assumed that you can materialize such things out of the ether or whatever. If you die, your enchantment-sets can be picked up by anyone who finds your corpse. I think this is ultimately more elegant than having a mechanic that somehow binds enchantment cards to weapon cards or something.

## Empirical Metrics

- Playtime
- Player engagement / playtime (meaningful actions taken when it's not "your turn").
- # of times players swear, laugh, gloat, cheer, cry during the game.
- time taken for rules explanation
- time difference between first playthrough w/ new players and a typical playthrough with experienced players
- Subjective ratings by playtesters
- Sources of conflict that occur in Star Wars that can also occur in Version 4.
  - A wants an alliance with B, but B does not want to become a thrall of A.
  - A breaks an alliance with B by entering into an alliance with C that B does not support.
  - A trounces B in a minor skirmish, prompting rage and retaliation from B.
  - A is unwilling to trade with B because of B's aid to C, an enemy of A's ally D.
  - A is unable to deliver tribute to B, but B thinks A is betraying him.
  - A stole from B and B found out about it.
  - A wants something that belongs to B.
  - A seeks resources or weapons from B, who sabotages A by giving intelligence to C, an enemy of A.

## Theoretical Metrics

- Game-theoretic strategic analysis
- Narrative entropy (number of possible stories generated)

## Mechanics

### Encounters

When a new hex tile is added to the board, place one GP on it.

When any PC enters a tile with GP on it, they take all the GP and an *encounter* begins. Hereafter in this section, the player controlling this PC is referred to as "The Player", and the other players are "DMs".

An *encounter* consists of the following phases:

1. **Bidding:** The DMs place secret bids for the ability to run the encounter. The winner of the bid is hereafter referred to as "The DM". If two or more DMs tie for the highest bid, the player chooses how to break the tie.
2. **Encounter Setup:** The DM checks the page of the Encounter Guide corresponding to the tile entered by the PC. She chooses monsters and items to add to the encounter, subject to the restrictions in the Encounter Guide. Restrictions are dependent on the number of GP on the tile when the PC entered it. Higher GP amounts allow more and stronger monsters and items in the encounter.
3. **Encounter Resolution:** The DM plays the part of the NPCs or monsters, negotiating or fighting on their behalf. Encounter resolution may result in the PC hiring the monsters, fighting them, bribing them to leave peacefully, or buying their items. All exchanges up to the start of combat occur transactionally and must be approved by both the player and DM. Combat can be unilaterally started by either side. Combat may end when either the PC or the monsters are dead, or when the PC retreats. The monsters may retreat if their case is hopeless, but the DM gains nothing but time from this; the monsters leave their items behind. There can be no negotiation after combat. When combat ends, the encounter proceeds immediately to step 4.
4. **Encounter Teardown:** If the PC defeated the monsters in combat, he is entitled to all the items and resources in the encounter, including items added by the DM and resources the PC may have given to the monsters before starting combat. Otherwise, the DM takes any items not traded to the PC, as well as any resources or items traded or given to the monsters by the PC. She may not take the monsters themselves, however; undefeated monsters are returned to the Source. If the monsters are victorious in combat, the DM takes the contents of the PC's inventory.
5. **Encounter Seeding:** The DM distributes the GP she bid over the map. She may place any number of GP on any tile that does not contain a PC or a city.

#### Incentives

- The player may benefit from initiating an encounter by:
  - Opening a route to another part of the board
  - Gaining items through trade or combat
  - Hiring monsters
  - Gaining XP
  - Gaining GP, and thus the ability to bid on and run future encounters.
- The DM may benefit from bidding on an encounter by:
  - Weakening a rival
  - Profiting from trade with an ally
  - Controlling the seeding of future encounters
  - Gaining items (which cannot be obtained any other way) from a peaceful encounter
  - Gaining knowledge about what resources a player has or is willing to offer in trade
- The player may benefit from combat by:
  - Gaining XP
  - Gaining all items and resources in the encounter (as opposed to just gaining some via trade)
  - Weakening the DM by not allowing them to keep the items.
- The player may suffer from combat by:
  - PC death
  - Losing all items
  - Expending resources (spells, HP)
- The DM may benefit from combat by:
  - Gaining all the PC's items if they die
- The DM may suffer from combat by:
  - Allowing the player to take all items, leaving the DM nothing in return

### Combat

Combat can occur between any number of parties, but usually there are just two. Most frequently, one side is a PC and the other is a DM player controlling NPCs, but PvP is also possible.

In each round of combat, the players choose one action card from their hand and reveal their chosen cards simultaneously. The cards are resolved in order of initiative, which may be affected by the card's Speed stat, the PCs' stats, or environmental effects. Resolving a card consists of designating targets if the card requires it, and following the instructions on the card. This continues until all but one of the players have been defeated (have no more cards) or have retreated. 

Some more specific ideas for combat mechanics:

- Players do not have a personal deck or library distinct from their hand and discard. Newly-acquired cards go into your hand and usually move to the discard when played.
- All cards in the discard are visible to all players. Many effects allow players to move a card of their choice from their discard into their hand.
- The most basic cards, *cantrips*, let you take a card from your discard into your hand as part of their effect. This allows you to recycle cantrips indefinitely -- or discard them for the one-time benefit of recovering a more powerful ability from your discard.
- Cards can have effects that last for multiple rounds. These include enchantments and units.
- As noted above, cards in your hand represent both your abilities and your health or hit points. Attack cards force your opponents to discard one or more cards. There's a lot of opportunity for subtle variations on this idea:
  - Basic attack cards let the attacker draw one card (blindly) from the target's hand and discard it. But if the card drawn is an armor or shield card, it's returned to the target's hand and the attack has no effect.
  - Special attacks can do varying amounts of damage depending on what cards the target is holding. For example, if you hit someone with a fire attack, you can continue taking cards from their hand as long as the last card drawn is a flammable item.
  - Cantrips are a sort of stamina bar -- you can keep on casting them forever, or you can burn through them and hope that the more powerful spells you gain by doing so will be enough to take your opponents down.

---

A player's stats are represented by a pool of dice. The die types are Ranged, Melee, and Magic. A round of combat involves with the player rolling their dice. They may roll any number of dice, as long as it's greater than the number they rolled the previous round. If they cannot do so (because they rolled all their dice in the previous round), they are routed, which is considered a combat loss. The PC doesn't die, however. They just lose some items (how many?) and still gain experience from the combat.

Based on the die result, the player now has a certain amount of power available in each of the three areas -- melee, ranged, and magic. The player may play ability cards that use power from the three areas to grant various effects. Any leftover power is converted directly to damage on the opponent. Monster cards have three types of HP that correspond to the various attack types. If any of these reaches zero, the player wins the combat. Monsters may have armor or weaknesses that affect the amount of damage dealt by attacks of various attributes. Maybe the player must choose a single attack type each round, which allows for more strategy. If the player must choose how to attack before rolling the dice, it introduces an element of risk.

After dealing damage, if the monster is not dead, the player takes damage based on the monster's attack roll and attack attributes. The monster's attack roll is done similarly to the player's. If this causes the player to reach 0 HP, the player loses the combat.

Maybe the number of dice the monster rolls is the player's level plus a constant. This would cause monsters to level along with players, while still being easier to defeat if the player is higher level.

### Movement

To keep the game pacey, players shouldn't spend turns just moving around the board when there's nothing for them to do on the way. The following movement rules seem reasonable:

- PCs may move through any number of hexes that have no GP/encounter tokens on them.
- PCs may interact with one non-encounter map location at any point during their movement phase.
- An encounter ends the movement phase.

---

Before moving, roll two (three? two @ night and 3 by day?) terrain dice. Each die has one blank face and one terrain type on each other face. The types of terrain shown are the ones you can safely move into. Each time you move into a new tile, put one threat marker on each terrain region in that tile if the terrain type was not rolled. You can move any distance as long as you don't move into a region with a threat marker. As soon as you do so, combat begins and you may not move further this turn.

If you lose a combat, increase the threat level on every terrain region of the same terrain type (?!) (a terrain region is a contiguous piece of one terrain type, and may span many tiles)

### Deckbuilding

A reasonable starting deck could be 5 or 6 cards: a few cantrips and a few more powerful abilities. After each encounter, the PC levels up by drafting a new ability card. All characters have the following cards, which are returned to the player's hand after use and cannot be discarded except by a few special attacks and effects:

- Basic melee attack: deal damage to one target according to your stats, modifers, and melee weapons.
- Basic ranged attack: deal damage to one target according to your stats, modifiers, and ranged weapons.
- Basic command unit: activate an action of a permanent that you control. If you played this card during the normal action phase of combat, and at least one opponent played an action other than Command Unit, you may play and resolve another action phase after all cards from the normal action phase have been resolved. You may not play this card again in the second action phase.

## MVP

With two players, many of the mechanics I've planned (e.g. bidding for DM rights) reduce to trivial cases. I think MVP is a three-player game.

With 6 terrain types (fields, mountain, swamp, lava, forest, ocean), and a strict adjacency matrix (fields-swamp-forest-mountain-lava-fields, all may be adjacent to ocean), there are 5*3*3 = 45 possible sequences of 3 adjacent vertices. To ensure that a matching terrain tile is usually available to expand the map, we probably need about 15 to 20 tiles. To simplify the encounter book, we can have one encounter scenario per terrain type. Since the MVP game is only 3 players, we need to build out and balance 3 factions. I arbitrarily choose Green, Red, and Black, since those seem like the most versatile and fun (powerful units, damage spells, and weird role-reversals/necromancy, respectively).

We also need to consider ability cards and item modifiers. I think the set of modifiers available can be very basic to start; we just need a few modifiers that stack and a few that replace other modsets, to make sure players have interesting decisions about which mods to use. 5 or 6 different ones should be enough. I'm not too concerned about replayability for the MVP, so the number of ability cards for each faction can be about the maximum number possible for a PC build. Maybe start with 10 per faction and make more as needed... or just institute a level cap. There should also be some surplus levels to build future generations of heroes...





## Version 4, the deckbuilder

Objective: Acquire Artifact cards worth the most total victory points, OR acquire both Evil Artifact cards, which trumps any number of victory points.

The game takes place in a number of rounds. In each round, one player is designated as the dealer. The role of dealer passes to the left each round. The round is broken up into a number of phases.

1. **Bidding** The dealer turns up the top 8 cards from the Source and places them face-up on the draft piles. Each player, starting with the player to the dealer's left, takes a turn. On your turn, draw from your Library up to your hand limit (usually 6, although Buildings may modify this). Play any number of cards, face down, next to any number of draft piles. This signifies your intent to take the top card of that pile. Place a marker of your color on top of the cards you played, to remind everyone which cards are yours.

2. **Auction Resolution** After everyone has played cards in the bidding phase, all cards are revealed. For each draft pile, the owner of the cards with the highest Influence total takes the top card. Influence may be affected by card text, and may be dependent on the card being drafted or cards played by opponents. Note that the bidding for each draft pile is resolved independently of any other pile.

If a player loses a bid, any Item cards they played in that bid are taken by the winner of the bid. This includes Artifacts.

3. **Building** In turn, each player may play any cards from their hand with a Permanent effect onto the Building piles in front of them. A player may have at most two Building piles. Only the top card of each pile has any effect.




### Alternate bidding mechanic (combat)

Each player in turn makes a bid, which consists of doing one of the following:

- Playing any number of cards to the table, face-down. The player may not do this if anyone at the table has face-up cards in front of them. 
- Turning one of their own cards and one of an opponent's cards face-up. The card with the lower influence is removed from the bid. The card's owner may choose whether to discard it to their library discard, or put it on the bottom of any draft pile. If the opponent now has no cards on the table, they may choose any draft pile to take into their hand. They are then out of the bidding round.
- Withdrawing from bidding. 

- When all cards are face-up, the player who has the most total influence







----------


(numberOfPlayers + 2) cards are placed face-up on the table. These are the Regions.

loop {
  In turn, each player places their hero token on one of the Regions, signifying that they intend to take that card.
  If a player puts their hero token on a Region that already has a hero, the two players fight a round of combat and the winner takes the cards in that Region.
  Once all players have played their hero tokens, new cards are dealt face-up onto all Regions without a hero. A region which was emptied by combat still exists and has one card dealt to it. The starting player for the next round is the one with their hero on the lowest-numbered card. If there are no heroes on cards because everyone fought a combat, the winner of the most recent combat is the starting player in the next round.
}
 





Version 5

The game is played over a series of scenarios. Each scenario is described in the Book of Tales, and generally describes 2 or 3 NPC factions who are in some kind of conflict. The players can interact with the NPC factions by fighting them directly, bringing them resources or items, or playing event cards that affect the various factions. The balance of power between the factions is represented by moving a token on a hex grid which is specific to each scenario. Various events will allow players to shift the power balance. If the token moves off the grid, one of the factions wins the scenario. This causes some kind of event.

Version 4 MOBA

Arrows -> Re-roll one opposing die
Stars -> Magic Points
Swords -> Move an opposing die on an adjacent space with fewer icons than the number rolled
Production -> Buy this unit, upgrade if in combat

Actions: 
- Roll as many of your dice from a single space as you want. Choose one of the rolled dice to activate. You cannot activate without rolling.
- Roll an opponent's die. If it shows a production symbol, move it anywhere on the board.
- Spend magic points to use a spell/ability card
- Draw one card from the deck or top of the discard, and either discard it or replace one of your abilities with the new card.

Events:
- if any unit die enters any shrine, the unit is destroyed (returned to the source) and the current player rolls one of the dice in that shrine. If a shrine has all dice showing blank faces, the shrine is destroyed and the player who owns it loses. A new player swaps in and continues with the shrine back at full health. OR, if playing with a fixed set of players, the owner of the shrine loses 3 points and the player who destroyed the shrine gets 1 point.













# Version 4.1

Building on the idea of "everyone is a DM", players will design, build, and maintain a dungeon or terrain region in which the other players can face challenges to gain XP. Encounters provide benefits for both the encountering player and the DM.

Players build a set of decks which represent their characters, cities, and armies. Buying a card to add to one of these decks entails discarding a set of cards of equal value to the one bought. The discards are played to a terrain region that the player controls. Other players who move into that region can then interact with the cards on that region (fighting monsters, picking up items).

Each terrain region produces resources each turn for its owner, but only if it has no cards on it. Terrain owners are thus incentivized to get other players to pick up their discards. When a player defeats monsters on a DM's terrain:
- the monsters are returned to the DM's deck
- the player takes the items
- the DM gets XP for the items taken by the player
- the player gets XP for the monsters defeated
The exchange is thus "fair" in some sense, since all parties are compensated for the loss of cards. The DM has an advantage because there is a chance that the player will lose the encounter and the DM will be able to take his items. 

If your territory is next to someone else's and your hero is in either region, you can challenge the owner of the other territory to a battle. The winner takes both regions.

Endgame: There are N good and 2 bad Portals. You get victory points by permanently converting one of your terrain regions into a Good portal, and spending gold to upgrade the portal (each upgrade gives an additional victory point). However, you can also build Evil portals (which are worth negative points, and whose absolute value increases with each upgrade). If you control both Evil portals at the end of the game, you win via eeeeeevil. You cannot discard to or get gold from a region with a portal. The ownership of a portal is determined by the regions adjacent to it. If all adjacent regions are owned by the same player, that player also owns the portal and any points associated with it. If there is no single player who owns all adjacent regions, the portal is contested and no one owns it. Note that this means players can agree to neutralize an evil portal by making sure no one owns it.

Resources: Terrain areas have an icon indicating the resource they produce: iron, wood, mercury, gems or sulfur. Each resource corresponds to a faction, and can be used to buy units from that faction. If you control a terrain area with an icon showing, you can use that resource to reduce the cost of purchases. For example, if a card's cost is 2 gold and 1 wood, you can pay for it with 3 gold, but if you have a region that produces wood, you only need to pay 2 gold. When you discard a card to a terrain region, you gain its total value (gold + other resources) in gold.

Maybe instead of resource types being inherent to terrain, players can upgrade terrain with building cards. That gives players a choice: do they want to mine multiple areas to be able to control multiple factions, at the expense of having fewer places to discard?

Experience: Monster cards have an experience value. A player who defeats a monster *not on their own terrain* keeps the monster card and can trade it in for experience points later, to buy new skills, spells, and actions.

Value flow: the value of players' decks increases over time. Players discard cards from their deck to buy new ones (presumably an equal exchange of value -- there may be some waste from overspending, but terrain can inject value into the system). The discarded cards are worth experience for other players, and experience can also be used to buy new cards. In effect, each discard adds value to the system twice.

Balance: A player who never discards and only fights battles for experience will not win, because he/she won't be able to buy any portals, and won't be able to usefully apply skills except for those which deal damage directly. A player who never fights battles and only discards will probably see their deck lose value (due to overspend, and having their economy stifled by too many discards). It's necessary to strike a balance between these two extremes (unless you grab the evil portals early -- then your deck can be as crappy as you want).

Combat: Each attack is 1 unit vs. 1 unit, possibly boosted by spells. After computing the total combat value on each side (which may be affected by attributes, spells, strengths, and weaknesses), the attacker draws a Fate card to determine what happens. The Fate card specifies a bonus or malus that the attacker gets, as well as what happens if the attack fails (attacking card is discarded, loss of morale, or nothing). If it succeeds, there may be a positive effect (morale boost). This only applies to melee attacks; for ranged attacks and damage spells, a die system is used instead. The attacker may roll as many dice as he/she wants to determine the bonus and risk to morale. The dice have sides (X, 0, 0, 1, 1, 2). The sides marked 1 also have a symbol indicating morale. If the attack succeeds, the attacker gains 1 morale for each 1 rolled. If an X is rolled on any die, the attack misses. If no X is rolled, but the attack strength + bonus is less than the defender's strength, the defender loses 1 strength/HP

Each unit card has a strength value which is the attack, defense, and HP value. Damage to a unit thus decreases its ability to fight. If total damage == total strength, the unit dies and is discarded.

Untapping all cards on your side of the field costs 1 morale. This allows them to attack again.

The attacker may draw cards from their deck at the cost of 1 morale each. If they hit zero morale, they lose immediately.

Both sides start at 3 morale (unless one side controls the Healing Spring building, which lets you start at 4 morale). Morale can go up to a maximum of 5.

Combat Round:
- If your morale is > 1, You may optionally pay 1 morale to untap all cards on your side.
- If your morale is > 1, you may optionally pay 1 morale to draw a card from your deck. Repeat this step any number of times.
- Play zero or more cards face-down from your hand to the field. Played cards start out untapped.
- You may pass your turn at this point. You must pass if there are no opposing cards to target. You must either play a card from your hand or attack each turn, otherwise you lose the combat. If you can neither play nor attack (e.g. because you have 1 morale, no cards in hand, and all your cards are tapped) you lose.
- Choose one untapped unit on your field to attack with. If it is face-down, reveal it. Choose an opposing unit to target. If it is face down, reveal it. Tap the attacking card.
- Compute the combat strength on both sides.
- Based on the attack type (melee or ranged), draw from the Fate deck or roll the dice.
- Based on the attack result (specified in detail on the Fate card, or kill/hit/miss as determined by the ranged dice), adjust morale and damage on both sides.
- If either player's morale is <= 0 at this point, they lose.
- Move any units that were killed this round to their owner's discard pile. Units go to the discard pile of the player who played them, even if another player gained control of them this round.


Stuff on cards:
- Description/Effects
- Picture
- Strengths/Weaknesses
- Resource Cost: Gold, XP, and/or resource
- Gold/XP given for discarding (on back of card)
- Name
- Type (Unit, Spell, Building)
- Subtype (Creature, Person, Golem, Undead)
- Attack type (melee, ranged)