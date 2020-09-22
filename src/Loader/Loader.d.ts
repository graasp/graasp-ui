import React from 'react'
import { LoadingType } from 'react-loading'

interface LoaderProps {
  type: LoadingType
  color: string
  className?: string
}

declare const Loader: React.FC<LoaderProps>
