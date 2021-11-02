const role = ["servant", "priest", "merchant", "admin"]
const status = ["pending", "completed", "rejected", "cancelled"];
const to = ["bookshop", "cantine", "donation", "stayCafe", "kitchen"];

export const selectorFields = {
    role, status, to
}

export const unediableFields = ["id", "email", "timeCreated", "timeUpdated", "amount", "lastLogin", "totalBalance", "pendingBalance", "availableBalance", "from"]