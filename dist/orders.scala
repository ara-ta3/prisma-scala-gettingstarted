case class Orders(
    id: Int,
    user_id: Int,
    order_date: Option[java.time.LocalDateTime],
    total_amount: BigDecimal,
    ordered_items: String,
    users: String
)