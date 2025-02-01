case class Users(
    id: Int,
    username: String,
    email: String,
    password_hash: String,
    current_cart: Option[String],
    orders: String
)