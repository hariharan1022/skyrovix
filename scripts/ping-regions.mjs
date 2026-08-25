import pkg from "pg";
const { Client } = pkg;

const regions = [
  "ap-south-1",      // Mumbai
  "ap-southeast-1",  // Singapore
  "us-east-1",       // N. Virginia
  "us-east-2",       // Ohio
  "us-west-1",       // N. California
  "us-west-2",       // Oregon
  "eu-west-1",       // Ireland
  "eu-central-1",    // Frankfurt
];

for (const region of regions) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  console.log(`Testing region [${region}] at host [${host}]...`);
  
  const client = new Client({
    user: 'postgres.eesiuqeswydlmwhecrcy',
    host: host,
    database: 'postgres',
    password: '123harimahesh',
    port: 6543,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    await client.connect();
    console.log(`>>> SUCCESS! Database is hosted in region: ${region} <<<`);
    
    const { rows } = await client.query(`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename
    `);
    console.log("Tables found:", rows.map(r => r.tablename));
    await client.end();
    break;
  } catch (err) {
    console.log(`Failed for region [${region}]: ${err.message}`);
  } finally {
    try {
      await client.end();
    } catch (e) {}
  }
}
process.exit(0);
