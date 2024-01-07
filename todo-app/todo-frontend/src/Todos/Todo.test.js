import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

describe('Todo Component', () => {
    const mockOnClickDelete = jest.fn();
    const mockOnClickComplete = jest.fn();

    it('should display the todo text', () => {
        const todo = { text: 'Test Todo', done: false };
        const { getByText } = render(<Todo todo={todo} onClickDelete={mockOnClickDelete} onClickComplete={mockOnClickComplete} />);
        expect(getByText('Test Todo')).toBeInTheDocument();
    });

    it('should show "This todo is not done" if todo is not done', () => {
        const todo = { text: 'Test Todo', done: false };
        const { getByText } = render(<Todo todo={todo} onClickDelete={mockOnClickDelete} onClickComplete={mockOnClickComplete} />);
        expect(getByText('This todo is not done')).toBeInTheDocument();
    });

    it('should show "This todo is done" if todo is done', () => {
        const todo = { text: 'Test Todo', done: true };
        const { getByText } = render(<Todo todo={todo} onClickDelete={mockOnClickDelete} onClickComplete={mockOnClickComplete} />);
        expect(getByText('This todo is done')).toBeInTheDocument();
    });

    it('should call onClickDelete when delete button is clicked', () => {
        const todo = { text: 'Test Todo', done: false };
        const { getByText } = render(<Todo todo={todo} onClickDelete={mockOnClickDelete} onClickComplete={mockOnClickComplete} />);
        fireEvent.click(getByText('Delete'));
        expect(mockOnClickDelete).toHaveBeenCalled();
    });

    it('should call onClickComplete when "Set as done" button is clicked', () => {
        const todo = { text: 'Test Todo', done: false };
        const { getByText } = render(<Todo todo={todo} onClickDelete={mockOnClickDelete} onClickComplete={mockOnClickComplete} />);
        fireEvent.click(getByText('Set as done'));
        expect(mockOnClickComplete).toHaveBeenCalled();
    });
});
