import sys
import os
import json
from concurrent.futures import ThreadPoolExecutor

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from llm.roadmap import roadmap
from llm.search_query import search_query
from llm.youtube_filteration import youtube_filteration_best
from scrapping.youtube_scrapping import youtube_search
from scrapping.pdf_scrapping import search_and_download_pdf
from extraction.skill_extractor import extraction

executor = ThreadPoolExecutor(max_workers=5)

user = input("Enter the topic you want to learn: ")

extractor = extraction(user)
print("Extracted topic:", extractor)

roadmap_future = executor.submit(roadmap, user)


pdf_future = executor.submit(search_and_download_pdf, user)

# Wait for roadmap to complete
result_json = json.loads(roadmap_future.result())
length_json = len(result_json)

# Prepare parallel execution for video searches
search_futures = {}

for component in result_json:
    query = search_query(component['name'])
    print(f"Search query for {component['name']} : {query}")
    search_futures[component['name']] = executor.submit(youtube_search, query)

# Collect YouTube search results
for component in result_json:
    search_results = search_futures[component['name']].result()
    best_videos = youtube_filteration_best(main_topic=extractor, sub_topic=component['name'], json_field=search_results)
    component['videos'] = best_videos if best_videos else []

# Fetch PDFs result
pdf_result = pdf_future.result()
pdf_links = pdf_result.get("links", []) if "error" not in pdf_result else []

# Final response
final_response = {
    "roadmap_name": extractor,
    "roadmap_components": result_json,
    "pdf_links": pdf_links,
    "total_components": length_json
}

# Convert to JSON string
roadmap_json_str = json.dumps(final_response)
print(roadmap_json_str)
