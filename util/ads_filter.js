function adsFilter(description) {
    if (description.includes(`Channel Join SS ပါရပါမည်`)
        || description.includes(`1week ကို Unit 10000 ဖိုး Giveaway ပေးပါမယ်ဗျ`)) {
        return true
    }
    return false
}

module.exports = {adsFilter}