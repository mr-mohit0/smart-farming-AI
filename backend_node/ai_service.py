#!/usr/bin/env python3
"""AI Service Bridge - Called by Node.js backend to interact with Gemini via Emergent LLM key."""
import sys
import json
import asyncio
import os

from emergentintegrations.llm.chat import LlmChat, UserMessage

EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")

async def call_gemini(prompt_text, system_message):
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=f"farming-{os.getpid()}",
        system_message=system_message
    ).with_model("gemini", "gemini-2.5-flash")

    user_message = UserMessage(text=prompt_text)
    response = await chat.send_message(user_message)
    return response

def build_crop_prompt(data):
    system = "You are an expert Indian agricultural scientist. Always respond ONLY with valid JSON, no markdown, no extra text."
    soil = data.get("soil", "not specified")
    season = data.get("season", "not specified")
    location = data.get("location", "")
    weather = data.get("weather")

    prompt = f"""Based on the following farming conditions, recommend the best crop to grow:

Soil Type: {soil}
Season: {season}
Location: {location or 'India'}"""

    if weather:
        prompt += f"""
Current Weather:
- Temperature: {weather.get('temperature')}°C
- Humidity: {weather.get('humidity')}%
- Condition: {weather.get('condition')}"""

    prompt += """

Respond ONLY with this JSON format (no markdown, no code fences):
{
  "crop": "Name of the recommended crop",
  "reason": "Why this crop is recommended for these conditions (2-3 sentences)",
  "tips": "Important farming tips for this crop (2-3 actionable tips)",
  "expectedYield": "Expected yield information"
}"""
    return system, prompt

def build_disease_prompt(data):
    system = "You are an expert plant pathologist. Always respond ONLY with valid JSON, no markdown, no extra text."
    symptoms = data.get("symptoms", "")

    prompt = f"""Identify the plant disease based on these symptoms and provide treatment:

Symptoms: {symptoms}

Respond ONLY with this JSON format (no markdown, no code fences):
{{
  "disease": "Name of the disease",
  "cause": "What causes this disease (1-2 sentences)",
  "solution": "Treatment and prevention measures (2-3 actionable steps)",
  "severity": "Severity level (Mild/Moderate/Severe)"
}}"""
    return system, prompt

def build_image_prompt():
    system = "You are an expert plant pathologist analyzing plant leaf images. Always respond ONLY with valid JSON, no markdown, no extra text."
    prompt = """Carefully analyze this plant leaf image. If any disease is present, identify it.

Respond ONLY with this JSON format (no markdown, no code fences):
{
  "disease": "Name of the disease (or 'Healthy' if no disease)",
  "cause": "Cause of the disease",
  "solution": "Treatment and prevention measures",
  "severity": "Severity level (Mild/Moderate/Severe)",
  "confidence": "Confidence level of analysis (Low/Medium/High)"
}"""
    return system, prompt

async def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input provided"}))
        sys.exit(1)

    try:
        input_data = json.loads(sys.argv[1])
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
        sys.exit(1)

    req_type = input_data.get("type", "crop")

    if not EMERGENT_LLM_KEY:
        print(json.dumps({"error": "EMERGENT_LLM_KEY not configured"}))
        sys.exit(1)

    try:
        if req_type == "crop":
            system, prompt = build_crop_prompt(input_data)
        elif req_type == "disease":
            system, prompt = build_disease_prompt(input_data)
        else:
            print(json.dumps({"error": f"Unknown type: {req_type}"}))
            sys.exit(1)

        response_text = await call_gemini(prompt, system)

        # Parse JSON from response
        json_match = None
        import re
        match = re.search(r'\{[\s\S]*\}', response_text)
        if match:
            json_match = match.group(0)

        if json_match:
            parsed = json.loads(json_match)
            print(json.dumps({"success": True, "data": parsed}))
        else:
            # Try parsing the whole response
            parsed = json.loads(response_text)
            print(json.dumps({"success": True, "data": parsed}))

    except json.JSONDecodeError:
        # If we can't parse JSON, return the raw text in a structured format
        print(json.dumps({"success": True, "data": {"raw": response_text}, "parseError": True}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())
