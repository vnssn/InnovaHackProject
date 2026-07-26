import hashlib

CITY_COORDINATES: dict[str, tuple[float, float]] = {
    "mumbai": (19.0760, 72.8777),
    "bengaluru": (12.9716, 77.5946),
    "bangalore": (12.9716, 77.5946),
    "delhi": (28.7041, 77.1025),
    "new delhi": (28.6139, 77.2090),
    "hyderabad": (17.3850, 78.4867),
    "chennai": (13.0827, 80.2707),
    "kolkata": (22.5726, 88.3639),
    "pune": (18.5204, 73.8567),
    "ahmedabad": (23.0225, 72.5714),
    "jaipur": (26.9124, 75.7873),
    "surat": (21.1702, 72.8311),
    "lucknow": (26.8467, 80.9462),
    "kanpur": (26.4499, 80.3319),
    "nagpur": (21.1458, 79.0882),
    "indore": (22.7196, 75.8577),
    "thane": (19.2183, 72.9781),
    "bhopal": (23.2599, 77.4126),
    "visakhapatnam": (17.6868, 83.2185),
    "vizag": (17.6868, 83.2185),
    "pimpri-chinchwad": (18.6298, 73.7997),
    "patna": (25.5941, 85.1376),
    "vadodara": (22.3072, 73.1812),
    "ghaziabad": (28.6692, 77.4538),
    "ludhiana": (30.9010, 75.8573),
    "agra": (27.1767, 78.0081),
    "nashik": (20.0059, 73.7898),
    "ranchi": (23.3441, 85.3096),
    "faridabad": (28.4089, 77.3178),
    "meerut": (28.9845, 77.7064),
    "rajkot": (22.3039, 70.8022),
    "varanasi": (25.3176, 82.9739),
    "srinagar": (34.0837, 74.7973),
    "aurangabad": (19.8762, 75.3433),
    "dhanbad": (23.7957, 86.4304),
    "amritsar": (31.6340, 74.8723),
    "navi mumbai": (19.0330, 73.0297),
    "allahabad": (25.4358, 81.8463),
    "prayagraj": (25.4358, 81.8463),
    "howrah": (22.5958, 88.2636),
    "gwalior": (26.2183, 78.1828),
    "jabalpur": (23.1815, 79.9864),
    "coimbatore": (11.0168, 76.9558),
    "vijayawada": (16.5062, 80.6480),
    "jodhpur": (26.2389, 73.0243),
    "madurai": (9.9252, 78.1198),
    "raipur": (21.2514, 81.6296),
    "kota": (25.2138, 75.8648),
    "guwahati": (26.1445, 91.7362),
    "chandigarh": (30.7333, 76.7794),
    "thiruvananthapuram": (8.5241, 76.9366),
    "trivandrum": (8.5241, 76.9366),
    "solapur": (17.6599, 75.9064),
    "hubballi": (15.3647, 75.1240),
    "hubli": (15.3647, 75.1240),
    "tiruchirappalli": (10.7905, 78.7047),
    "trichy": (10.7905, 78.7047),
    "bareilly": (28.3670, 79.4304),
    "moradabad": (28.8386, 78.7733),
    "mysore": (12.2958, 76.6394),
    "mysuru": (12.2958, 76.6394),
    "gurgaon": (28.4595, 77.0266),
    "gurugram": (28.4595, 77.0266),
    "noida": (28.5355, 77.3910),
    "kochi": (9.9312, 76.2673),
    "cochin": (9.9312, 76.2673),
    "bhubaneswar": (20.2961, 85.8245),
    "salem": (11.6643, 78.1460),
    "dehradun": (30.3165, 78.0322),
    "jammu": (32.7266, 74.8570),
    "mangaluru": (12.9141, 74.8560),
    "mangalore": (12.9141, 74.8560),
    "udaipur": (24.5854, 73.7125),
    "shimla": (31.1048, 77.1734),
    "panaji": (15.4909, 73.8278),
    "goa": (15.2993, 74.1240),
    "new york": (40.7128, -74.0060),
    "london": (51.5074, -0.1278),
    "tokyo": (35.6762, 139.6503),
    "singapore": (1.3521, 103.8198),
    "dubai": (25.2048, 55.2708),
    "paris": (48.8566, 2.3522),
    "sydney": (-33.8688, 151.2093),
    "san francisco": (37.7749, -122.4194),
}

def get_city_coordinates(city_name: str) -> tuple[float, float]:
    if not city_name:
        return (20.5937, 78.9629)
    
    clean_name = city_name.strip().lower()
    if clean_name in CITY_COORDINATES:
        return CITY_COORDINATES[clean_name]
    
    # Check partial match
    for known_city, coords in CITY_COORDINATES.items():
        if known_city in clean_name or clean_name in known_city:
            return coords
            
    # Deterministic fallback coordinate within India bounds (Lat 10-28, Lng 72-88)
    h = int(hashlib.md5(clean_name.encode("utf-8")).hexdigest(), 16)
    lat = 10.0 + (h % 18000) / 1000.0
    lng = 72.0 + ((h >> 16) % 16000) / 1000.0
    return (round(lat, 4), round(lng, 4))
