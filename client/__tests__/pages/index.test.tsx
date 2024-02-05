import React from "react";
import { render, screen } from '@testing-library/react'
import Home from '@/app/propertydetail/index'
import '@testing-library/jest-dom'

 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})