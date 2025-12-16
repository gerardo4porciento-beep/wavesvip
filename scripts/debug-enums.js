const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gpbxrwhdoctqivzbddwz.supabase.co';
const supabaseKey = 'sb_secret_Q_bKcTM9lb7K7z_SXn2RVg_AW7gNH1B';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkEnum() {
    console.log("Checking first booking status...");

    // Fetch a booking to see what the status looks like in reality
    const { data, error } = await supabase
        .from('bookings')
        .select('status')
        .limit(5);

    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Found statuses:", data);
    }
}

checkEnum();
