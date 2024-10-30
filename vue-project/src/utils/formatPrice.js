export function formatPrice(price) {
  return `￥${price.toLocaleString('ja-JP')}`
}