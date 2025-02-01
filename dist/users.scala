
package com.example

case class Users(
    id: Int,
    username: String,
    email: String,
    passwordHash: String,
    currentCart: Option[String],
    orders: String
)