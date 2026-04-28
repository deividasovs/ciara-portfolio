import React from 'react';

export interface LayoutOption<K extends string> {
    key: K;
    name: string;
}

interface LayoutPickerProps<K extends string> {
    options: LayoutOption<K>[];
    active: K;
    onChange: (key: K) => void;
    label?: string;
}

export function LayoutPicker<K extends string>({
    options,
    active,
    onChange,
    label = 'Layout',
}: LayoutPickerProps<K>) {
    return (
        <div className="layout-picker" role="group" aria-label={`${label} variant`}>
            <span className="layout-picker__title">{label}</span>
            {options.map(opt => (
                <button
                    key={opt.key}
                    type="button"
                    onClick={() => onChange(opt.key)}
                    className={`layout-picker__btn ${active === opt.key ? 'is-active' : ''}`}
                    aria-pressed={active === opt.key}
                >
                    <span className="layout-picker__letter">{opt.key}</span>
                    <span className="layout-picker__name">{opt.name}</span>
                </button>
            ))}
        </div>
    );
}
