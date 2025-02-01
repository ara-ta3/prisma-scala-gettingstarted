
package com.example

case class Orders(
    id: Int,
    userId: Int,
    orderDate: Option[java.time.LocalDateTime],
    totalAmount: BigDecimal,
    orderedItems: String,
    users: String
)