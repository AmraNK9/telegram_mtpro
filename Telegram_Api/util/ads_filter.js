function adsFilter(description) {
    if (description.includes(`Channel Join SS ပါရပါမည်`)
        || description.includes(`1week ကို Unit 10000 ဖိုး Giveaway ပေးပါမယ်ဗျ`)
        || description.includes(`ငွေသွင်း/ ငွေထုတ် မြန်ဆန်တိကျ စိတ်ချစေမဲ့ Agent ရှာနေရင်တော့`)
        || description.includes(`ငွေသွင်း/ငွေထုတ်`)
        || description.includes(`1xbet ငွေသွင်း`)
        || description.includes(`ဆီမှာ 1xbet ငွေသွင်း 450 ကျပ် ငွေထုတ် 2500ကျပ် ကနေစပြီ…`)
        || description.includes(`နေ့ရက်တိုငိးရင်ခုန်ပျော်ရွှင်ချင်ရင်တော့ Eurobet မှာဆော့မှရမယ်နော်..`)
        || description.includes(`Eurobet မှာ သင်္ကြန်မုန့်ဖိုးတွေကြီး လှိမ့်ပေးနေသလား အောက်မေ့ရ`)
        || description.includes(`Eurobet ကတော့ မနေ့ကအထုတ်တွေတောင်အခုထိတင်လို့မကုန်နိုင်`)
        || description.includes(`ဘော်တွေ အတွက် Eurobetရှိတယ်နော်...`)
        || description.includes(`Eurobetနဲ့ဆို ခု ဆက်သွယ် ခုပဲထုတ်ဖို့ပြင်လို့ရပြီနော်`)
        || description.includes(`Eurobetနဲ့ဆို ခု ဆက်သွယ် ခုပဲထုတ်ဖို့ပြင်လို့ရပြီနော်`)
        || description.includes(`Game Link- www.eurobetmm.com`)
        || description.includes(`1xbet`)
        || description.includes(`Eurobet`)
        || description.includes(`Club 388 Max`)
        || description.includes(`@388max`)
        || description.includes(`ဂိမ်းပေါင်း 500 ကျော်ကို`)
        || description.includes(`ဝယ်ဂဏန်း တင်ပေးလိုက်ပြီ ကြိမ်းသေထွက်မည်`)
        || description.includes(`BigBoss999`)
        || description.includes(`စလော့ဂိမ်`)
        || description.includes('ဂိမ်းအသစ်တွေအပြင် 24နာရီ အကောင်းဆုံး+ဝန်ဆောင်မှု')
        || description.includes('@Club888Hotline1')
        || description.includes('အလျော်ကြမ်း အပေးကြမ်းလို ဆော့သူတိုင်')
        || description.includes('@MMM3694')
        || description.includes('galaxy388')
        || description.includes('555𝐌𝐢𝐱 𝐌𝐲𝐚𝐧𝐦𝐚𝐫')
        || description.includes('မောင်း / ဘော်ဒီ')
        || description.includes(`အွန်လိုင်းဂိမ်း`)
        || description.includes(`ဘောလုံး၊ ငါးပစ် ဂိမ်းတွေကို တစ်နေရာထဲမှာပဲဆော့ချင်ရင်`)
        || description.includes(`မန်ဘာသစ် 100%  (အများဆုံး 10000)`)
        || description.includes(`နေ့စဉ်ရှံးကြေး 10%`)
        || description.includes(`စလော့`)
        || description.includes(`ဝယ်ဂဏန်း တင်ပေးလိုက်ပြီ ကြိမ်းသေထွက်မည်`)
        || description.includes(`ထိုင်းရောက်ရွေမြန်မာတွေအတွက်`)
        || description.includes(`အွန်လိုင်းကာစီနိုဝက်ဆိုဒ်`)
        || description.includes(`ညီမတို့ဂိမ်းဆိုဒ်ကို`)
        || description.includes(`ရှမ်း သုံး ရှစ် ရှစ် ကို ခုဘဲ ဆက်သွယ် ပြီး`)

    
    ) {
        return true
    }
    return false
}

module.exports = { adsFilter }