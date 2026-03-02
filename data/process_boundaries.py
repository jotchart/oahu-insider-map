#!/usr/bin/env python3
"""
Process NB Subdistrict GeoJSON into unified neighborhood boundaries for Oahu Insider Map.
Merges granular subdistricts into meaningful neighborhoods, assigns regions, and outputs
a clean GeoJSON file.
"""

import json
import sys
import os

# Try to import shapely for polygon merging
try:
    from shapely.geometry import shape, mapping
    from shapely.ops import unary_union
    HAS_SHAPELY = True
except ImportError:
    print("shapely not found, attempting to install...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "shapely"])
    from shapely.geometry import shape, mapping
    from shapely.ops import unary_union
    HAS_SHAPELY = True

# ============================================================
# Configuration
# ============================================================

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
NB_FILE = os.path.join(SCRIPT_DIR, "nb-subdistricts-raw.geojson")
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "neighborhoods.geojson")

# Region assignments by board number
BOARD_REGION = {
    1:  "East Honolulu",
    2:  "East Honolulu",
    3:  "Metro Honolulu",
    4:  "Metro Honolulu",
    5:  "Metro Honolulu",
    6:  "Metro Honolulu",
    7:  "Metro Honolulu",
    8:  "Metro Honolulu",
    9:  "Metro Honolulu",
    10: "Metro Honolulu",
    11: "Metro Honolulu",
    12: "Metro Honolulu",
    13: "Metro Honolulu",
    14: "Metro Honolulu",
    15: "Metro Honolulu",
    16: "Metro Honolulu",
    17: "Pearl City / Aiea",
    18: "Pearl City / Aiea",
    20: "Pearl City / Aiea",
    21: "Pearl City / Aiea",
    22: "West Oahu",
    23: "West Oahu",
    24: "Leeward Coast",
    25: "Central Oahu",
    26: "Central Oahu",
    27: "North Shore",
    28: "Windward",
    29: "Windward",
    30: "Windward",
    31: "Windward",
    32: "Windward",
    33: "Windward",
    34: "West Oahu",
    35: "Central Oahu",
    36: "Leeward Coast",
}

# Current 67 neighborhoods from data.js (for comparison)
CURRENT_NEIGHBORHOODS = {
    "Kahala", "Diamond Head / Gold Coast", "Manoa", "Pacific Heights / Tantalus",
    "Nuuanu / Old Pali", "Makiki / Punahou", "Kaimuki", "Kapahulu",
    "Moiliili / University", "St. Louis Heights", "Kakaako", "Ala Moana",
    "Waikiki", "Downtown / Chinatown", "Punchbowl / Kam Heights", "Liliha",
    "McCully", "Palolo", "Kalihi / Kalihi-Palama", "Airport / Mapunapuna",
    "Hawaii Kai", "Portlock", "Hawaii Loa Ridge", "Aina Haina", "Niu Valley",
    "Waialae Nui Ridge", "Lanikai", "Kailua Beachside", "Kailua Town",
    "Enchanted Lake", "Aikahi", "Kaneohe", "Lilipuna / Kaneohe Bay",
    "Ahuimanu / Heeia", "Waimanalo", "Kaaawa / Punaluu / Hauula",
    "Haleiwa Town", "Pupukea / Sunset Beach", "Kawela Bay", "Waialua",
    "Mokuleia", "Kahuku", "Laie", "Mililani", "Mililani Mauka",
    "Wahiawa", "Whitmore Village", "Pearl City", "Pearl City Highlands",
    "Aiea", "Aiea Heights", "Salt Lake", "Aliamanu", "Moanalua",
    "Ko Olina", "Kapolei", "Ewa Beach", "Ocean Pointe / Ewa Gentry",
    "Makakilo", "Royal Kunia", "Waipahu", "Waikele",
    "Nanakuli", "Waianae", "Maili", "Makaha",
}

# ============================================================
# Merge rules: maps output neighborhood name -> list of (board_num, sd_desc) or special markers
# ============================================================

def build_merge_rules():
    """
    Returns a dict: neighborhood_name -> list of (board_num, sd_desc) tuples to include.
    Any subdistrict not claimed by a rule will be flagged.
    """
    rules = {}

    # --- Keep as distinct (single subdistricts or simple merges) ---

    # Kuliouou-Kalani Iki board (2) - keep each distinct, merge two Waialae Iki Ridge
    rules["Aina Haina"] = [(2, "Aina Haina")]
    rules["Hawaii Loa Ridge"] = [(2, "Hawaii Loa Ridge")]
    rules["Kuliouou Valley"] = [(2, "Kuliouou Valley")]
    rules["Kalani Valley"] = [(2, "Kalani Valley")]
    rules["Waialae Iki Ridge"] = [(2, "Waialae Iki Ridge"), (2, "Waialae Iki Ridge--New Increment")]
    rules["Wiliwilinui"] = [(2, "Wiliwilinui")]
    rules["Kainani / Wailupe"] = [(2, "Kainani/Wailupe")]

    # Koolauloa (28)
    rules["Kaaawa / Kahana"] = [(28, "Kaaawa/Kahana")]
    rules["Hauula"] = [(28, "Hauula")]
    rules["Kahuku"] = [(28, "Kahuku")]
    rules["Laie"] = [(28, "Laie")]
    rules["Punaluu"] = [(28, "Punaluu")]

    # North Shore (27)
    rules["Haleiwa"] = [(27, "Haleiwa")]
    rules["Kawailoa"] = [(27, "Kawailoa")]
    rules["Mokuleia"] = [(27, "Mokuleia")]
    rules["Pupukea / Sunset Beach"] = [(27, "Pupukea/Sunset Beach")]
    rules["Waialua"] = [(27, "Waialua")]

    # Kailua board (31)
    rules["Maunawili"] = [(31, "Maunawili")]

    # Kahaluu board (29) - keep these distinct
    rules["Temple Valley"] = [(29, "Temple Valley")]
    rules["Ahuimanu"] = [(29, "Ahuimanu")]
    rules["Kaalaea / Kahaluu"] = [(29, "Kaalaea/Kahaluu")]

    # Kaimuki board (4)
    rules["Maunalani Heights / Wilhelmina Rise"] = [(4, "Maunalani Heights/Wilhelmina Rise")]

    # Waialae-Kahala board (3)
    rules["Diamond Head"] = [(3, "Diamond Head")]
    rules["Kahala"] = [(3, "Kahala")]
    rules["Waialae Nui Ridge"] = [(3, "Waialae Nui Ridge")]
    rules["Waialae Nui Valley"] = [(3, "Waialae Nui Valley")]

    # Kaneohe board (30)
    rules["Heeia"] = [(30, "Heeia")]

    # Liliha-Kapalama board (14) - keep these distinct
    rules["Alewa / Liliha"] = [(14, "Alewa/Liliha")]
    rules["Kapalama / Kamehameha Heights"] = [(14, "Kapalama/Kamehameha Heights")]
    rules["Puunui"] = [(14, "Puunui")]

    # Nuuanu-Punchbowl board (12)
    rules["Pacific Heights"] = [(12, "Pacific Heights")]
    rules["Nuuanu Valley"] = [(12, "Nuuanu Valley")]

    # Aiea board (20) - keep these distinct
    rules["Aiea Heights"] = [(20, "Aiea Heights")]
    rules["Halawa Heights / Valley"] = [(20, "Halawa Heights & Valley")]

    # Waipahu board (22) - keep these distinct
    rules["Lower Waipahu"] = [(22, "Lower Waipahu")]
    rules["Village Park"] = [(22, "Village Park")]
    rules["Waikele"] = [(22, "Waikele")]

    # Mililani-Waipio-Melemanu board (25) - keep these distinct
    rules["Melemanu"] = [(25, "Melemanu")]
    rules["Mililani Town"] = [(25, "Mililani Town")]
    rules["Waipio Acres"] = [(25, "Waipio Acres")]
    rules["Mililani Uka"] = [(25, "Mililani Uka")]

    # Waianae board (24) - keep these distinct
    rules["Makaha"] = [(24, "Makaha")]
    rules["Waianae"] = [(24, "Waianae")]

    # --- Merge groups ---

    # All Hawaii Kai subdistricts -> "Hawaii Kai"
    rules["Hawaii Kai"] = [
        (1, "Marina West"), (1, "Marina Central"), (1, "Hahaione Valley"),
        (1, "Hahaione High Rise"), (1, "Hawaii Kai Ridge & Cove"), (1, "Kamiloiki"),
        (1, "Kalama Valley"), (1, "Lunalilo Park Mauka"), (1, "Lunalilo Park Makai"),
        (1, "Marina East"), (1, "Koko Head"),
    ]

    # All Waimanalo subdistricts -> "Waimanalo"
    rules["Waimanalo"] = [
        (32, "Flamingo St./Saddle City/Bellows"), (32, "Waimanalo"),
        (32, "Mekia/Poalima area"), (32, "Banyan Tree"), (32, "Village area"),
        (32, "Beach Lots"), (32, "Oluolu Homestead"), (32, "New Homestead"),
        (32, "Old Homestead"), (32, "Farm Lots"), (32, "Hale Aupuni"),
    ]

    # All Kaneohe subdistricts EXCEPT Heeia -> "Kaneohe"
    rules["Kaneohe"] = [
        (30, "Kaneohe"), (30, "Windward Mall"), (30, "Haiku Village"),
        (30, "Windward Community College"), (30, "Pohakea"), (30, "Waikalua"),
        (30, "Puohala Village"), (30, "Kapunahala"), (30, "Luluku"),
        (30, "Hoomaluhia"), (30, "Windward City Shopping Center"),
        (30, "Mokulele"), (30, "Kokokahi"), (30, "Yacht Club Terrace"),
    ]

    # All Waikiki subdistricts -> "Waikiki"
    rules["Waikiki"] = [
        (9, "Waikiki Beach/Ft DeRussy/Ilikai"), (9, "Ala Wai/Kuhio/Seaside"),
        (9, "Waikiki Jungle Area"),
    ]

    # Ala Moana-Kakaako: split into Ala Moana and Kakaako
    rules["Ala Moana"] = [
        (11, "Ala Moana"), (11, "Kaheka"), (11, "Rycroft"),
    ]
    rules["Kakaako"] = [(11, "Kakaako/Kewalo Basin")]

    # Kaimuki merge: East + West + Business District
    rules["Kaimuki"] = [
        (4, "East Kaimuki & Business District"), (4, "West Kaimuki"),
    ]

    # Kahaluu board (29) - merge remaining into "Kahaluu"
    rules["Kahaluu"] = [
        (29, "Kualoa/Hakipuu/Waikane/Waiahole"),
        (29, "Okana/Waialua/Pakole/Heeia Kea"),
        (29, "Hui Iwa Loop"),
    ]

    # Makiki / Tantalus
    rules["Makiki / Tantalus"] = [
        (10, "Kinau/Lower Makiki/Kewalo"), (10, "Tantalus/Mott/Smith/Heulu"),
    ]

    # Punchbowl (merge Nuuanu-Punchbowl's Punchbowl + Makiki board's East Punchbowl)
    rules["Punchbowl"] = [
        (12, "Punchbowl"), (10, "East Punchbowl"),
    ]

    # Kailua board (31) merges
    rules["Kailua Town / Aikahi"] = [(31, "Coconut Grove/Aikahi/Kailua Town area")]
    rules["Enchanted Lake"] = [(31, "Enchanted Lake/Keolu area")]
    rules["Lanikai / Kailua Beach"] = [(31, "Kalahe Beach Lots/Lanikai/Kailua")]

    # Aiea board (20) - merge lower areas
    rules["Aiea"] = [
        (20, "E Loch/Ford Is/E Waimalu/Pearlridge"),
        (20, "Lower Aiea/Stadium Area"),
    ]

    # Liliha-Kapalama: Kuakini + Lanakila -> "Liliha"
    rules["Liliha"] = [
        (14, "Kuakini"), (14, "Lanakila"),
    ]

    # Manoa merge: all 4 into "Manoa"
    rules["Manoa"] = [
        (7, "Lower Manoa"), (7, "Upper Manoa"), (7, "Middle Manoa"), (7, "Woodlawn"),
    ]

    # Palolo merge: all 4 into "Palolo"
    rules["Palolo"] = [
        (6, "Upper Palolo Valley"), (6, "Palolo Park Area/Housing"),
        (6, "Middle Palolo"), (6, "Lower Palolo"),
    ]

    # Diamond Head-Kapahulu-St Louis Heights board (5) - keep as distinct neighborhoods
    rules["Kapahulu"] = [(5, "Kapahulu/East Ala Wai")]
    rules["Diamond Head / Kapiolani"] = [(5, "Diamond Head/Ft Ruger/Kapiolani Park")]
    rules["St. Louis Heights"] = [(5, "St Louis Heights/Kanewai")]

    # --- At-Large boards: each becomes one neighborhood ---
    rules["Downtown / Chinatown"] = [(13, "At-Large")]
    rules["Kalihi Valley"] = [(16, "At-Large")]
    rules["Kalihi-Palama"] = [(15, "At-Large")]
    rules["McCully-Moiliili"] = [(8, "At-Large")]
    rules["Pearl City"] = [(21, "At-Large")]
    rules["Wahiawa"] = [(26, "At-Large")]
    rules["Makakilo / Kapolei"] = [(34, "At-Large")]
    rules["Nanakuli / Maili"] = [(36, "At-Large")]
    rules["Mokapu"] = [(33, "Mokapu")]
    rules["Ewa"] = [(23, "At-Large")]
    rules["Mililani Mauka / Launani Valley"] = [(35, "At-Large")]
    rules["Aliamanu / Salt Lake / Foster Village"] = [(18, "At-Large")]
    rules["Moanalua"] = [(17, "Moanalua")]

    return rules


def load_geojson(path):
    with open(path, 'r') as f:
        return json.load(f)


def merge_geometries(geom_list):
    """Merge a list of GeoJSON geometry dicts into one using shapely."""
    shapes = []
    for geom in geom_list:
        s = shape(geom)
        if not s.is_valid:
            s = s.buffer(0)
        shapes.append(s)
    merged = unary_union(shapes)
    return merged


def compute_centroid(geom_shape):
    """Return (lat, lng) from a shapely shape's centroid."""
    c = geom_shape.centroid
    return round(c.y, 4), round(c.x, 4)


def main():
    print("=" * 70)
    print("Processing Oahu Neighborhood Boundaries")
    print("=" * 70)

    # Load NB subdistricts
    nb_data = load_geojson(NB_FILE)
    features = nb_data['features']
    print(f"\nLoaded {len(features)} NB subdistrict features")

    # Build index: (board_num, sd_desc) -> list of features (handles duplicates)
    feat_index = {}
    for f in features:
        p = f['properties']
        key = (p['board_num'], p['sd_desc'])
        if key not in feat_index:
            feat_index[key] = []
        feat_index[key].append(f)

    # Build merge rules
    rules = build_merge_rules()

    # Track which features are claimed
    claimed = set()
    output_features = []
    errors = []

    for neighborhood_name, sources in rules.items():
        geom_list = []
        board_nums = set()

        for (bnum, sd_desc) in sources:
            key = (bnum, sd_desc)
            if key not in feat_index:
                errors.append(f"  WARNING: ({bnum}, '{sd_desc}') not found for '{neighborhood_name}'")
                continue

            for f in feat_index[key]:
                geom_list.append(f['geometry'])
                board_nums.add(bnum)
            claimed.add(key)

        if not geom_list:
            errors.append(f"  ERROR: No geometries found for '{neighborhood_name}'")
            continue

        # Merge geometries
        merged_shape = merge_geometries(geom_list)
        lat, lng = compute_centroid(merged_shape)

        # Determine region from board numbers
        regions = set()
        for bn in board_nums:
            if bn in BOARD_REGION:
                regions.add(BOARD_REGION[bn])
        region = list(regions)[0] if len(regions) == 1 else " / ".join(sorted(regions))

        feature = {
            "type": "Feature",
            "properties": {
                "name": neighborhood_name,
                "region": region,
                "board_num": sorted(list(board_nums)),
                "lat": lat,
                "lng": lng,
            },
            "geometry": mapping(merged_shape),
        }
        output_features.append(feature)

    # Check for unclaimed features
    unclaimed = []
    for key in feat_index:
        if key not in claimed:
            unclaimed.append(key)

    if errors:
        print("\n--- Errors/Warnings ---")
        for e in errors:
            print(e)

    if unclaimed:
        print(f"\n--- Unclaimed subdistricts ({len(unclaimed)}) ---")
        for (bnum, sd) in sorted(unclaimed):
            town = feat_index[(bnum, sd)][0]['properties']['towns']
            print(f"  Board {bnum:>3} ({town:30s}): {sd}")

    # Write output GeoJSON
    output = {
        "type": "FeatureCollection",
        "features": output_features,
    }
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(output, f, indent=2)

    print(f"\n{'=' * 70}")
    print(f"Output: {OUTPUT_FILE}")
    print(f"Total neighborhoods: {len(output_features)}")
    print(f"{'=' * 70}")

    # Print summary by region
    by_region = {}
    for feat in output_features:
        p = feat['properties']
        r = p['region']
        if r not in by_region:
            by_region[r] = []
        by_region[r].append(p['name'])

    region_order = [
        "Metro Honolulu", "East Honolulu", "Windward", "North Shore",
        "Central Oahu", "Pearl City / Aiea", "West Oahu", "Leeward Coast"
    ]

    print("\n--- Neighborhoods by Region ---\n")
    for region in region_order:
        names = sorted(by_region.get(region, []))
        print(f"  {region} ({len(names)}):")
        for n in names:
            marker = " [NEW]" if n not in CURRENT_NEIGHBORHOODS else ""
            # Also check close matches
            if marker and any(n.lower() in cn.lower() or cn.lower() in n.lower() for cn in CURRENT_NEIGHBORHOODS):
                marker = " [~SIMILAR]"
            print(f"    - {n}{marker}")
        print()

    # Summary stats
    all_names = set(feat['properties']['name'] for feat in output_features)
    new_names = all_names - CURRENT_NEIGHBORHOODS
    removed = CURRENT_NEIGHBORHOODS - all_names

    print(f"--- Comparison with current {len(CURRENT_NEIGHBORHOODS)} neighborhoods ---")
    print(f"  Output neighborhoods: {len(all_names)}")
    print(f"  New (not in current list): {len(new_names)}")
    if new_names:
        for n in sorted(new_names):
            print(f"    + {n}")

    print(f"\n  In current list but NOT in output: {len(removed)}")
    if removed:
        for n in sorted(removed):
            print(f"    - {n}")

    print(f"\n  Exact matches: {len(all_names & CURRENT_NEIGHBORHOODS)}")

    print("\nDone!")


if __name__ == "__main__":
    main()
