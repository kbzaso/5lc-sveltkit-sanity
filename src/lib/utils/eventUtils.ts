export function calculatePrice(ticketsToBuy: number, ticketSystem: any) {
  let totalCost = 0;
  let remainingTickets = ticketsToBuy;
  const partsOrder = ["firsts_tickets", "seconds_tickets", "thirds_tickets"];
  let ticket = {
    firsts_tickets: { amount: 0 },
    seconds_tickets: { amount: 0 },
    thirds_tickets: { amount: 0 },
  };

  // Create a copy of ticketSystem
  let ticketSystemCopy = JSON.parse(JSON.stringify(ticketSystem));

  // Calculate total cost
  for (let part of partsOrder) {
    if (remainingTickets <= ticketSystemCopy[part].amount) {
      totalCost += remainingTickets * ticketSystemCopy[part].price;
      ticket[part].amount = remainingTickets;
      ticketSystemCopy[part].amount -= remainingTickets;
      remainingTickets = 0;
      break;
    } else {
      totalCost += ticketSystemCopy[part].amount * ticketSystemCopy[part].price;
      ticket[part].amount = ticketSystemCopy[part].amount;
      remainingTickets -= ticketSystemCopy[part].amount;
      ticketSystemCopy[part].amount = 0;
    }
  }

  return { totalCost, ticket };
}