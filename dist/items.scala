case class Items(
    id: Int,
    name: String,
    description: Option[String],
    price: BigDecimal,
    stock: Option[Int],
    current_cart: String,
    ordered_items: String
)