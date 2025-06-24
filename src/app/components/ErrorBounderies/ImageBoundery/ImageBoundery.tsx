import { ImageBounderyProps } from './ImageBoundery.props';
import  { ErrorMessage }  from './../ErrorMessage/ErrorMessage';
import React from 'react';

interface State {
  hasError: boolean;
}

class ImageBoundery extends React.Component<ImageBounderyProps, State> {
  constructor(props: ImageBounderyProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('Изображение больше не доступно:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage />;  
    }

    return this.props.children;
  }
}

export default ImageBoundery;
