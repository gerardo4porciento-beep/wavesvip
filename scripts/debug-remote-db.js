const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gpbxrwhdoctqivzbddwz.supabase.co';
const supabaseKey = 'sb_secret_Q_bKcTM9lb7K7z_SXn2RVg_AW7gNH1B'; // The key the user just used

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log("Checking remote DB connection...");

    // 1. Try to fetch one row, selecting booking_date
    const { data, error } = await supabase
        .from('bookings')
        .select('booking_date')
        .limit(1);

    if (error) {
        console.error("❌ Error querying bookings:", error);
        if (error.code === '42703') {
            console.error("👉 DIAGNOSIS: Column 'booking_date' DOES NOT EXIST. Migration needed.");
        }
    } else {
        console.log("✅ Query successful. 'booking_date' column exists.");
        console.log("Sample data:", data);
    }
}

check();
