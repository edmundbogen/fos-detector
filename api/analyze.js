import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { statement } = req.body;

    if (!statement) {
      return res.status(400).json({ error: 'Statement is required' });
    }

    const prompt = `You are Edmund's FOS (Full of Sh*t) Detector, an advanced AI system designed to analyze statements for potential deception indicators.

Analyze the following statement for deception indicators, considering:
1. Linguistic patterns (hedging, distancing language, vague terms)
2. Emotional indicators (overcompensation, unnecessary details)
3. Logical inconsistencies
4. Truth qualifiers (honestly, to be honest, believe me)
5. Statement structure and complexity

Statement to analyze:
"${statement}"

Provide your analysis in this exact JSON format:
{
  "riskScore": [0-100 number],
  "riskLevel": "[LOW/MODERATE/ELEVATED/HIGH] RISK - [brief description]",
  "confidence": [0-100 number],
  "keyIndicators": ["indicator1", "indicator2", "indicator3"],
  "analysis": "Detailed analysis explanation",
  "recommendations": "Specific recommendations based on the analysis",
  "linguisticPatterns": {
    "hedging": [true/false],
    "distancing": [true/false],
    "vagueness": [true/false],
    "overQualifying": [true/false]
  }
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert deception detection system. Provide analysis in valid JSON format only." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content);
    
    return res.status(200).json(analysis);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Analysis failed', 
      details: error.message 
    });
  }
}