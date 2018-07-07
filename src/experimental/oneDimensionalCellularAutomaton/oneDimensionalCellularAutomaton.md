# One Dimensional Cellular Automaton

![Cellular Automaton](http://img.gunook.com/upload/c/3f/c3f3e0a1df9e8ba4297bac315a5358b6_thumb.jpg)

## Description

This experimental project was created to explore `cellular automaton`,
originally discovered in the 1940s by Stanislaw Ulam and John von Neumann.

A cellular automaton is a `discrete model`, that consists of a `grid of cells`
(can be in any finite number of dimensions).
Each cell is in `one of a finite number of states`. The simplest example has
two possibilities of 1 and 0 (“on” and “off” or “alive” and “dead”).

Every cell defines a set of cells called its `neighborhood`.

At start an initial state (t = 0) is selected by assigning a state for each cell.
New generation are created (t = t + 1) according to some fixed rule
(f.e. a mathematical function) that determine the new state of a cell in terms
of the current state of the cell and the states of the cells in its neighborhood.
Typically, the rule for updating the state of cells is the same for each cell
and does not change over time, and is applied to the whole grid simultaneously.
Exceptions are: The stochastic cellular automaton and asynchronous cellular automaton.

Cellular automata can simulate a variety of real-world systems, including
biological and chemical ones. Von Neumann’s work in self-replication and
cellular automaton is conceptually similar to what is probably the most famous
cellular automaton: the "Game of Life".

## How to run it

Adjust the `webpack.config.js` file as follows:
> `entry: './src/fun/cellularAutomaton/game.ts'`

## What will you learn
* Usage of cellular automaton
* How to use Phaser.GameObjects.Graphics

## References
* [1] [Wikipedia](https://en.wikipedia.org/wiki/Cellular_automaton)
* [2] [Nature Of Code](http://natureofcode.com/book/chapter-7-cellular-automata)
* [3] [Stephen Wolfram’s 1,280-page A New Kind of Science](http://www.wolframscience.com/nks)
