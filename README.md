# shopify-fall2022-challenge

Hi! First off, this was a super unique first-round interview experience and I just wanted to say that I thoroughly enjoyed it. I appreciate Shopify taking more of a "real-world" approach to the interview process and really getting a wholistic view of their applicants. I know that in the prompt it said that React wasn't necessary; however, it's what I'm most comfortable using to build a frontend. I quickly threw together a basic frontend so I can focus more on the backend code.

My application should be fairly simple to use. I've already installed all the necessary packages using the install script. The run button just executes "./bin/run" to get into the virtual environment and start the Flask server. The inventory commands are used to initialize items that can then be sent to warehouses that you create. You are able to add and remove items, as well as edit the name and quantity of existing items in your unallocated inventory. Your unallocated inventory is what the Warehouses take from and changes are reflected in the remaining inventory.

In terms of future additions to the application, I believe that the code structure allows for them without much complication. For example, if I wanted to implement the "shipments" feature all I would have to do is make new API endpoints and a new jsx file to handle the frontend. Also, even though there were minimal exceptions to handle in this iteration of the application, it would be easy to add more custom exceptions and handlers for them if needed in the future.
