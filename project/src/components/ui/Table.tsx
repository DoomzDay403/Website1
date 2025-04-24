import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-secondary-200 ${className}`}>
        {children}
      </table>
    </div>
  );
};

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

const TableHead: React.FC<TableHeadProps> = ({ children, className = '' }) => {
  return <thead className={`bg-secondary-50 ${className}`}>{children}</thead>;
};

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

const TableBody: React.FC<TableBodyProps> = ({ children, className = '' }) => {
  return (
    <tbody className={`bg-white divide-y divide-secondary-200 ${className}`}>
      {children}
    </tbody>
  );
};

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  onClick?: () => void;
}

const TableRow: React.FC<TableRowProps> = ({
  children,
  className = '',
  isHighlighted = false,
  onClick
}) => {
  const highlightClass = isHighlighted ? 'bg-primary-50' : '';
  const cursorClass = onClick ? 'cursor-pointer hover:bg-secondary-50' : '';
  
  return (
    <tr
      className={`${highlightClass} ${cursorClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  isHeader?: boolean;
  align?: 'left' | 'center' | 'right';
}

const TableCell: React.FC<TableCellProps> = ({
  children,
  className = '',
  isHeader = false,
  align = 'left'
}) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[align];
  
  const Tag = isHeader ? 'th' : 'td';
  const headerClass = isHeader
    ? 'px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider'
    : 'px-6 py-4 whitespace-nowrap text-sm text-secondary-900';
  
  return (
    <Tag className={`${headerClass} ${alignClass} ${className}`}>{children}</Tag>
  );
};

export { Table, TableHead, TableBody, TableRow, TableCell };