import * as React from 'react';

export interface AccordionProps {
  initOpenSections?: number[];
  title?: string;
  children: React.ReactNode;
}

export interface AccordionState {
  openSections: number[];
}

export declare class Accordion extends React.Component<
  AccordionProps,
  AccordionState
> {
  static Section: typeof Section;

  public toggleSection: (index: number) => void;
  public openAllSections: () => void;
  public closeAllSections: () => void;
}

export interface SectionProps {
  title?: string;
  renderHeader?: ({
    index: number,
    isOpen: boolean,
    openSections: number,
  }) => React.ReactNode;
  renderContent: ({
    index: number,
    isOpen: boolean,
    openSections: number,
  }) => React.ReactNode;
}

export declare class Section extends React.Component<SectionProps> {}
