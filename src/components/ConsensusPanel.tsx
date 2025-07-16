import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ConsensusResult } from '../services/consensus'

interface ConsensusPanelProps {
  result: ConsensusResult
  onClose: () => void
}

export const ConsensusPanel: React.FC<ConsensusPanelProps> = ({ result, onClose }) => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Consensus Analysis
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Summary</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">{result.summary}</p>
        </div>
        
        {result.commonPoints.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Common Points</h4>
            <ul className="space-y-1">
              {result.commonPoints.map((point, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {result.differences.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Differences</h4>
            <ul className="space-y-1">
              {result.differences.map((diff, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-yellow-500 mr-2">⚠</span>
                  {diff}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {result.bestResponse && (
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommended Response</h4>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                {result.bestResponse.chatbot}
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                {result.bestResponse.reason}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}