import { useState } from 'react'

const NEXT_LABEL = '>'
const PREV_LABEL = '<'
const ELLIPSES = '...'
const NUM_PAGES_IN_SELECTOR = 7 // Must be odd

// Generate array of ints from start to end (inclusive)
const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => i + start)

const onClickPage = (p, goToPage) => {
  if (p === ELLIPSES) return
  goToPage(p)
}

const getPageNumbersToDisplay = (page, numPages) => {
  let pagesToDisplay = []
  let pageRange = range(1, numPages)
  if (numPages <= NUM_PAGES_IN_SELECTOR) {
    return pageRange
  }
  let shouldShowLeftEllipses = page > NUM_PAGES_IN_SELECTOR / 2 + 1
  let shouldShowRightEllipses =
    numPages - page + 1 > NUM_PAGES_IN_SELECTOR / 2 + 1

  if (shouldShowLeftEllipses && !shouldShowRightEllipses) {
    pagesToDisplay.push(1, ELLIPSES)
    pagesToDisplay.push(
      ...range(numPages - NUM_PAGES_IN_SELECTOR + 3, numPages)
    )
  } else if (shouldShowLeftEllipses && shouldShowRightEllipses) {
    const numCenter = NUM_PAGES_IN_SELECTOR - 4
    pagesToDisplay.push(1, ELLIPSES)
    pagesToDisplay.push(
      ...range(
        page - Math.floor(numCenter / 2),
        page + Math.floor(numCenter / 2)
      )
    )
    pagesToDisplay.push(ELLIPSES, numPages)
    console.log(
      `upper  bound: ${range(
        page - Math.floor(numCenter / 2),
        page + Math.floor(numCenter / 2)
      )}`
    )
    console.log(pagesToDisplay)
  } else if (!shouldShowLeftEllipses && shouldShowRightEllipses) {
    pagesToDisplay.push(...range(1, NUM_PAGES_IN_SELECTOR - 2))
    pagesToDisplay.push(ELLIPSES, numPages)
  } else {
    throw new Error('Check pagination logic')
  }
  return pagesToDisplay
}

/**
 * Cases:
 * Page = 1
 *  1 page, just show the page
 *  2-7 pages, show all pages
 *  8+ pages, show 1 2 3 4 5 ... n
 * Page = 2
 *  2 pages, show both
 *  3-7 pages, show 1 2 3 4 5 ... n
 * Page = 3
 *  1 2 3 4 5 ... n
 * Page = 4
 *  1 2 3 4 5 ... n
 * Page = 5
 *  1 ... 4 5 6 ... n
 * Page = n-3
 *  1 ... n-4 n-3 n-2 n-1 n
 * Page = n-2
 *  1 ... n-4 n-3 n-2 n-1 n
 *
 * @param {} param0
 * @returns
 */
export default function PageSelector({ page, numPages, goToPage }) {
  const pagesToDisplay = getPageNumbersToDisplay(page, numPages)

  return (
    <div className="page-selector">
      <span className="page-step-label" onClick={() => goToPage(page - 1)}>
        {PREV_LABEL}
      </span>
      {pagesToDisplay.map((p, i) => {
        const pageNumClass =
          (p === ELLIPSES ? '' : 'page-num') + (p === page ? ' curr-page' : '')
        return (
          <span
            className={pageNumClass}
            key={`${p}${i}`}
            onClick={() => onClickPage(p, goToPage)}
          >
            {p}
          </span>
        )
      })}
      <span className="page-step-label" onClick={() => goToPage(page + 1)}>
        {NEXT_LABEL}
      </span>
      <style jsx>{`
        .page-selector {
          margin: auto;
          width: 50%;
          text-align: center;
        }
        .page-num {
          border: 1px solid black;
          cursor: pointer;
          padding: 2px;
          margin: 0 5px 0 5px;
        }
        .curr-page {
          background: grey;
        }
        .page-step-label {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
