
package com.example

case class CurrentCart(
    id: Int,
    user_id: Int,
    item_id: Int,
    quantity: Int,
    users: String,
    items: String
)