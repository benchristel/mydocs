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