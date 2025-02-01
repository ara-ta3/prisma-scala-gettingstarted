
package com.example

case class Items(
    id: Int,
    name: String,
    description: Option[String],
    price: BigDecimal,
    stock: Option[Int],
    currentCart: String,
    orderedItems: String
)