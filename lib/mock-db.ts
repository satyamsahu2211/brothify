export type Category = { id: string; name: string }
export type Item = {
  id: string
  name: string
  categoryId: string
  price: number
  description?: string
}
export type User = { id: string; email: string; name?: string }
export type Order = {
  id: string
  userId: string
  itemIds: string[]
  total: number
  status: "pending" | "paid" | "preparing" | "completed"
  createdAt: string
}

export type Reservation = {
  id: string
  name: string
  email: string
  phone: string
  partySize: number
  datetime: string
  notes?: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

export type Feedback = {
  id: string
  reservation_id: string
  customer_email: string
  customer_name: string
  rating: number
  comment: string
  created_at?: string
  updated_at?: string
}

const db = {
  categories: [] as Category[],
  items: [] as Item[],
  users: [] as User[],
  orders: [] as Order[],
  reservations: [] as Reservation[],
  feedback: [] as Feedback[],
}

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

function seedOnce() {
  if (db.categories.length) return

  const catSoups: Category = { id: id("cat"), name: "Soups" }
  const catShakes: Category = { id: id("cat"), name: "Shakes" }
  const catJuices: Category = { id: id("cat"), name: "Juices" }
  db.categories.push(catSoups, catShakes, catJuices)

  const tomato: Item = {
    id: id("itm"),
    name: "Tomato Basil Soup",
    categoryId: catSoups.id,
    price: 6.5,
    description: "Slow-simmered tomatoes, basil, and cream.",
  }
  const pumpkin: Item = {
    id: id("itm"),
    name: "Creamy Pumpkin Soup",
    categoryId: catSoups.id,
    price: 7.0,
    description: "Velvety pumpkin with nutmeg and cream.",
  }
  const chocoShake: Item = {
    id: id("itm"),
    name: "Chocolate Shake",
    categoryId: catShakes.id,
    price: 5.5,
    description: "Rich cocoa, ice cream, and milk.",
  }
  const greenJuice: Item = {
    id: id("itm"),
    name: "Green Juice",
    categoryId: catJuices.id,
    price: 5.0,
    description: "Kale, apple, cucumber, ginger.",
  }
  db.items.push(tomato, pumpkin, chocoShake, greenJuice)

  const u1: User = { id: id("usr"), email: "alice@example.com", name: "Alice" }
  const u2: User = { id: id("usr"), email: "bob@example.com", name: "Bob" }
  db.users.push(u1, u2)

  const o1: Order = {
    id: id("ord"),
    userId: u1.id,
    itemIds: [tomato.id, chocoShake.id],
    total: 12.0,
    status: "paid",
    createdAt: new Date().toISOString(),
  }
  db.orders.push(o1)

  const r1: Reservation = {
    id: id("res"),
    name: "Sahil Patel",
    email: "sahil@example.com",
    phone: "+91-90000-00000",
    partySize: 2,
    datetime: new Date(Date.now() + 3600_000).toISOString(),
    notes: "Window seat if possible",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  }
  db.reservations.push(r1)

  const f1: Feedback = {
    id: id("fbk"),
    reservation_id: r1.id,
    customer_email: "sahil@example.com",
    customer_name: "Sahil Patel",
    rating: 5,
    comment: "Excellent food and great service! Will definitely come back.",
    created_at: new Date().toISOString(),
  }
  const f2: Feedback = {
    id: id("fbk"),
    reservation_id: id("res"),
    customer_email: "john@example.com",
    customer_name: "John Smith",
    rating: 4,
    comment: "Good food, but a bit slow on service.",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  }
  const f3: Feedback = {
    id: id("fbk"),
    reservation_id: id("res"),
    customer_email: "priya@example.com",
    customer_name: "Priya Sharma",
    rating: 5,
    comment: "Amazing ambiance and delicious dishes!",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  }
  db.feedback.push(f1, f2, f3)
}
seedOnce()

export const mockDb = {
  listCategories() {
    return db.categories
  },
  addCategory(name: string) {
    const c: Category = { id: id("cat"), name }
    db.categories.push(c)
    return c
  },
  listItems() {
    return db.items
  },
  getItem(idStr: string) {
    return db.items.find((i) => i.id === idStr)
  },
  addItem(data: Omit<Item, "id">) {
    const it: Item = { id: id("itm"), ...data }
    db.items.push(it)
    return it
  },
  updateItem(idStr: string, patch: Partial<Item>) {
    const it = db.items.find((i) => i.id === idStr)
    if (!it) return
    Object.assign(it, patch)
    return it
  },
  deleteItem(idStr: string) {
    const idx = db.items.findIndex((i) => i.id === idStr)
    if (idx >= 0) db.items.splice(idx, 1)
  },
  listUsers() {
    return db.users
  },
  addUser(data: Omit<User, "id">) {
    const u: User = { id: id("usr"), ...data }
    db.users.push(u)
    return u
  },
  updateUser(idStr: string, patch: Partial<User>) {
    const u = db.users.find((x) => x.id === idStr)
    if (!u) return
    Object.assign(u, patch)
    return u
  },
  deleteUser(idStr: string) {
    const idx = db.users.findIndex((u) => u.id === idStr)
    if (idx >= 0) db.users.splice(idx, 1)
  },
  listOrders() {
    return db.orders
  },
  getOrder(idStr: string) {
    return db.orders.find((o) => o.id === idStr)
  },
  addOrder(data: Omit<Order, "id" | "createdAt">) {
    const o: Order = { id: id("ord"), createdAt: new Date().toISOString(), ...data }
    db.orders.push(o)
    return o
  },
  listReservations() {
    return db.reservations
  },
  getReservation(idStr: string) {
    return db.reservations.find((r) => r.id === idStr)
  },
  addReservation(data: Omit<Reservation, "id" | "createdAt" | "status"> & { status?: Reservation["status"] }) {
    const r: Reservation = {
      id: id("res"),
      createdAt: new Date().toISOString(),
      status: data.status ?? "pending",
      ...data,
    }
    db.reservations.push(r)
    return r
  },
  updateReservation(idStr: string, patch: Partial<Reservation>) {
    const r = db.reservations.find((x) => x.id === idStr)
    if (!r) return
    Object.assign(r, patch)
    return r
  },
  deleteReservation(idStr: string) {
    const idx = db.reservations.findIndex((r) => r.id === idStr)
    if (idx >= 0) db.reservations.splice(idx, 1)
  },
  listFeedback() {
    return db.feedback
  },
  getFeedback(idStr: string) {
    return db.feedback.find((f) => f.id === idStr)
  },
  addFeedback(data: Omit<Feedback, "id" | "created_at" | "updated_at">) {
    const f: Feedback = {
      id: id("fbk"),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...data,
    }
    db.feedback.push(f)
    return f
  },
  updateFeedback(idStr: string, patch: Partial<Feedback>) {
    const f = db.feedback.find((x) => x.id === idStr)
    if (!f) return
    Object.assign(f, patch)
    return f
  },
  deleteFeedback(idStr: string) {
    const idx = db.feedback.findIndex((f) => f.id === idStr)
    if (idx >= 0) db.feedback.splice(idx, 1)
  },
}
