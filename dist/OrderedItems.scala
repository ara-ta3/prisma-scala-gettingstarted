
package com.example

case class OrderedItems(
    id: Int,
    orderId: Int,
    itemId: Int,
    quantity: Int,
    priceAtPurchase: BigDecimal,
    orders: String,
    items: String
)