import os
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def get_supabase() -> Client:
    return supabase

def test_connection():
    try:
        # Simple test query
        response = supabase.table("spots").select("id").limit(1).execute()
        print("✅ Supabase connection successful!")
        print(f"Response: {response.data}")
        return True
    except Exception as e:
        print(f"❌ Supabase connection failed: {e}")
        return False
