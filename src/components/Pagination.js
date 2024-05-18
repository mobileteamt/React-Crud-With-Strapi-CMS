import React from 'react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <nav aria-label="...">
                <ul className="pagination">
                    {currentPage > 1 && (
                    <li className="page-item">
                        <a className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                        Previous
                        </a>
                    </li>
                    )}
                    {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <a onClick={() => onPageChange(number)} className="page-link">
                        {number}
                        </a>
                    </li>
                    ))}
                    {currentPage < totalPages && (
                    <li className="page-item">
                        <a className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                        Next
                        </a>
                    </li>
                    )}
                </ul>
            </nav>
        </>
  )
}
