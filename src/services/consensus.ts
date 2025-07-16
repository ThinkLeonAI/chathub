import { ChatMessage } from '../types'

export interface ConsensusResult {
  summary: string
  commonPoints: string[]
  differences: string[]
  bestResponse?: {
    chatbot: string
    reason: string
  }
}

export class ConsensusService {
  static analyzeResponses(responses: Array<{ chatbot: string; message: ChatMessage }>): ConsensusResult {
    if (responses.length === 0) {
      return {
        summary: 'No responses to analyze',
        commonPoints: [],
        differences: []
      }
    }
    
    if (responses.length === 1) {
      return {
        summary: responses[0].message.content,
        commonPoints: [responses[0].message.content],
        differences: []
      }
    }
    
    const contents = responses.map(r => r.message.content)
    
    // Simple keyword-based analysis
    const allWords = contents.flatMap(content => 
      content.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 3)
    )
    
    const wordCounts = allWords.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const commonWords = Object.entries(wordCounts)
      .filter(([_, count]) => count >= Math.ceil(responses.length / 2))
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word)
    
    // Find common themes
    const commonPoints = this.extractCommonThemes(contents, commonWords)
    
    // Find differences
    const differences = this.extractDifferences(responses)
    
    // Determine best response (simple heuristic: longest response with most common words)
    const bestResponse = this.findBestResponse(responses, commonWords)
    
    const summary = this.generateSummary(responses, commonPoints)
    
    return {
      summary,
      commonPoints,
      differences,
      bestResponse
    }
  }
  
  private static extractCommonThemes(contents: string[], commonWords: string[]): string[] {
    const themes: string[] = []
    
    // Look for sentences containing common words
    for (const content of contents) {
      const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10)
      
      for (const sentence of sentences) {
        const lowerSentence = sentence.toLowerCase()
        const hasCommonWords = commonWords.some(word => lowerSentence.includes(word))
        
        if (hasCommonWords && !themes.some(theme => 
          this.calculateSimilarity(theme.toLowerCase(), lowerSentence) > 0.7
        )) {
          themes.push(sentence.trim())
        }
      }
    }
    
    return themes.slice(0, 5)
  }
  
  private static extractDifferences(responses: Array<{ chatbot: string; message: ChatMessage }>): string[] {
    const differences: string[] = []
    
    for (let i = 0; i < responses.length; i++) {
      for (let j = i + 1; j < responses.length; j++) {
        const response1 = responses[i]
        const response2 = responses[j]
        
        const similarity = this.calculateSimilarity(
          response1.message.content.toLowerCase(),
          response2.message.content.toLowerCase()
        )
        
        if (similarity < 0.5) {
          differences.push(
            `${response1.chatbot} and ${response2.chatbot} have different perspectives`
          )
        }
      }
    }
    
    return differences.slice(0, 3)
  }
  
  private static findBestResponse(
    responses: Array<{ chatbot: string; message: ChatMessage }>,
    commonWords: string[]
  ): { chatbot: string; reason: string } | undefined {
    if (responses.length === 0) return undefined
    
    let bestScore = -1
    let bestResponse = responses[0]
    
    for (const response of responses) {
      const content = response.message.content.toLowerCase()
      const wordCount = content.split(/\s+/).length
      const commonWordCount = commonWords.filter(word => content.includes(word)).length
      
      // Score based on length and common word usage
      const score = wordCount * 0.1 + commonWordCount * 2
      
      if (score > bestScore) {
        bestScore = score
        bestResponse = response
      }
    }
    
    return {
      chatbot: bestResponse.chatbot,
      reason: 'Most comprehensive response with common themes'
    }
  }
  
  private static generateSummary(
    responses: Array<{ chatbot: string; message: ChatMessage }>,
    commonPoints: string[]
  ): string {
    if (commonPoints.length === 0) {
      return `${responses.length} different perspectives were provided by the chatbots.`
    }
    
    const summary = `Based on ${responses.length} responses, the main consensus points include: ${commonPoints.slice(0, 2).join(', ')}.`
    return summary
  }
  
  private static calculateSimilarity(str1: string, str2: string): number {
    const words1 = str1.split(/\s+/)
    const words2 = str2.split(/\s+/)
    
    const intersection = words1.filter(word => words2.includes(word))
    const union = [...new Set([...words1, ...words2])]
    
    return intersection.length / union.length
  }
}