import type { EventDiscount, EventDiscounts } from "$lib/types/index";

// BATCH TICKETS SYSTEM
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

type TicketType = "firsts_tickets" | "seconds_tickets" | "thirds_tickets";
type Tickets = Record<TicketType, { amount: number, price: number }>;

export function calculateTandas(tickets: Tickets) {
  const partsOrder: TicketType[] = [
    "firsts_tickets",
    "seconds_tickets",
    "thirds_tickets",
  ];

  let tandas = Object.entries(tickets).map(([key, value]) => ({
    type: key as TicketType,
    ...value,
    index: partsOrder.indexOf(key as TicketType),
  }));

  tandas.sort(
    (a, b) => partsOrder.indexOf(a.type) - partsOrder.indexOf(b.type)
  );
  return tandas;
}

//  UBICATIONS TICKETS SYSTEM
type UbicationType = "ringside_tickets" | "general_tickets";
type Ubication = Record<UbicationType, { amount: number }>;

export function calculateUbications(tickets: Ubication) {
  const partsOrder: UbicationType[] = ["ringside_tickets", "general_tickets"];

  let ubication = Object.entries(tickets).map(([key, value]) => {
    let name;
    if (key === "ringside_tickets") {
      name = "Ringside";
    } else if (key === "general_tickets") {
      name = "General";
    }

    return {
      type: key as UbicationType,
      name,
      ...value,
      index: partsOrder.indexOf(key as UbicationType),
    };
  });

  ubication.sort(
    (a, b) => partsOrder.indexOf(a.type) - partsOrder.indexOf(b.type)
  );
  return ubication;
}

export function calculateUbicationPrice(ubications: Ubication, amount: number) {
  let total = 0;

  for (let ubicationType in ubications) {
    let ubication = ubications[ubicationType as UbicationType];
    total += amount * ubication.price;
  }

  return total;
}

// Calculate total quantity of tickets available in the studio
export function calculateTotalQuantity(
  ticketTypes: {
    [key: string]: { amount: number };
  } = {}
): number {
  return Object.values(ticketTypes).reduce(
    (total, ticketType) => total + ticketType.amount,
    0
  );
}

export function validateDiscount(discounts: EventDiscount[], code: string) {
  const normalizeDiscountCode = code
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "");

  if (Array.isArray(discounts)) {
    const discount = discounts.find(
      (discount: EventDiscount) => discount.code.toLowerCase() === normalizeDiscountCode && discount.active
    );
    return discount
      ? {
          success: true,
          error: false,
          code: normalizeDiscountCode,
          percentage: discount.percentage,
          message: `¡Tú código de descuento ${discount.code} del ${discount.percentage}% ha sido aplicado al total de tu compra!`,
        }
      : {
          success: false,
          error: true,
          message: "Código de descuento no válido",
        };
  }
  return {
    success: false,
    error: true,
    message: "Error al aplicar el código de descuento",
  };
}
