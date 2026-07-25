"use client"

import React, { useState } from "react"

interface MenuItemProps {
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  isActive?: boolean
}

export function MenuItem({ children, onClick, disabled = false, icon }: MenuItemProps) {
  return (
    <button
      className={`relative block w-full text-center group
        ${disabled ? "cursor-not-allowed opacity-40" : ""}
      `}
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="flex items-center justify-center h-full">
        {icon && (
          <span className="transition-all duration-200 group-hover:[&_svg]:stroke-[2.5]">
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  )
}

interface MenuContainerProps {
  children: React.ReactNode
}

export function MenuContainer({ children }: MenuContainerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = React.Children.toArray(children)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const iconColor = "text-gray-900 dark:text-gray-100"

  return (
    <div data-expanded={isExpanded}>
      <div className="relative">
        <div
          className={`relative w-8 h-8 sm:w-10 sm:h-10 cursor-pointer z-50 flex items-center justify-center transition-colors duration-200 ${iconColor}`}
          onClick={handleToggle}
        >
          {childrenArray[0]}
        </div>

        {childrenArray.slice(1).map((child, index) => {
          const item = child as React.ReactElement<MenuItemProps>
          const wrappedOnClick = () => {
            item.props.onClick?.()
            setIsExpanded(false)
          }
          return (
            <div
              key={index}
              className={`absolute top-0 left-0 w-8 h-8 sm:w-10 sm:h-10 will-change-transform flex items-center justify-center transition-colors duration-200 ${iconColor}`}
              style={{
                transform: `translateY(${isExpanded ? (index + 1) * 44 : 0}px)`,
                opacity: isExpanded ? 1 : 0,
                zIndex: 40 - index,
                transition: `transform ${isExpanded ? '300ms' : '300ms'} cubic-bezier(0.4, 0, 0.2, 1),
                           opacity ${isExpanded ? '300ms' : '350ms'}`,
                backfaceVisibility: 'hidden',
                perspective: 1000,
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              {React.cloneElement(item, { onClick: wrappedOnClick })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
