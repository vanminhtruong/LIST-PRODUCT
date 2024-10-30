export function formatDate(dateStr) {
    const options = {
        day: '2-digit', 
        month: '2-digit',
        year: 'numeric'
    }

    const date = new Date(dateStr)
    return `Ngày ${date.toLocaleDateString('vi-VN', options).replace(/\//g, ' năm ')}`
}