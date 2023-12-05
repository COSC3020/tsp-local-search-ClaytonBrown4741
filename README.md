[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12905358&assignment_repo_type=AssignmentRepo)
# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.  


**Answer:**  
In this case, the worst-case asymptotic time complexity would simply be $O(n^3)$ where  
n is the total amount of cities provided in the graph. This is because in my code I decided  
that the main for statement should try and loop $n^2$ amount of times. I chose this value  
because it was long enough to give the code a chance to try out a good amount of combinations  
while also being quick enough that it wouldn't take a ridiculously long time such as the Held-Karp  
algorithm would. In addition to this, within every loop I go through the current path and  
calculate its distance. This takes n amount of time, and because it happens $n^2$ amount of times,  
this gives us a worst-case asymptotic time complexity of $O(n^3)$. When returning an answer, the  
program will simply take the shortest path it had found up until that point and return it to the user.  
Of course, the answer isn't guaranteed to be as accurate as the one produced by Held-Karp, but it  
still has the potential to be very good. Additionally, please note that I am not including my while loop  
in my time complexity because it can only loop a maximum of 10 times. Because this is a constant amount  
of time, it is asymptotically insignificant so I do not include it.  
As for how I chose my i and k, I simply went ahead and chose them at random every time. However, I did  
have a few criteria for them in order to avoid repetition. For one, they could never be the same value,  
as this would just result in the same list as before. Additionally, the values could not be the same  
ones as they were before, as this would cause the list to swap back to the previous version of itself  
which would be redundant. I put these conditions into a while loop that would continue to generate a random  
version of k until it found an answer that satisfied them. However, I did also put a fail safe into this  
while loop so that it could only loop a maximum of 10 times before exitting and just using the value that  
it got. This was done to avoid potentially infinite loops, especially when dealing with smaller matrices  
that don't have many options to choose from.  
**Memory Complexity**:  
The worst-case asymptotic complexity of this program is simply O(n) where n is the total amount of cities  
provided in the graph. This is because at the very beginning of the program I make a list that contains all  
the cities for future reference and for calculating how many times the for loop should repeat (that being n*n  
times as described above). In addition to this, in my optswap function I make a copy of the current path for the  
purpose of altering it. The amount of memory this extra array takes up is "n" as well. Finally, in that same  
function I split the array into three more separate parts in order to manipulate them as necessary. All three  
of these parts put together gives us another "n" amount of memory that is used, so that means that the final  
asymptotic complexity of this program is O(3n) which is a linear amount and simplifies to O(n)
