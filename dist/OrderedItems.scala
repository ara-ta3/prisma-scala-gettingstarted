
package com.example

case class OrderedItems(
    id: Int,
    order_id: Int,
    item_id: Int,
    quantity: Int,
    price_at_purchase: BigDecimal,
    orders: String,
    items: String
)