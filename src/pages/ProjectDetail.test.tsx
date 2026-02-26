import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProjectDetail } from './ProjectDetail';

// Mock the projects data
jest.mock('../data/projects', () => ({
    projectsData: [
        {
            id: 'test-project',
            title: 'Test Project',
            desc: 'Test description',
            longDesc: 'Test long description',
            date: '2026',
            featured: true,
            thumbnailUrl: '/test-hero.jpg',
            images: [
                '/test-hero.jpg', // This should be filtered out
                '/test-detail-1.jpg',
                '/test-detail-2.jpg'
            ]
        }
    ]
}));

describe('ProjectDetail', () => {
    it('should show the hero photo but not repeat it in the detail photos', () => {
        render(
            <MemoryRouter initialEntries={['/projects/test-project']}>
                <Routes>
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                </Routes>
            </MemoryRouter>
        );

        // Check if the hero image is rendered
        const heroImg = screen.getByAltText(/Test Project hero/i);
        expect(heroImg).toBeInTheDocument();
        expect(heroImg).toHaveAttribute('src', '/test-hero.jpg');

        // Check if detail images are rendered
        // Note: the alt text "Test Project detail 1" will now refer to "/test-detail-1.jpg" 
        // because "/test-hero.jpg" was filtered out.
        const detail1 = screen.getByAltText(/Test Project detail 1/i);
        const detail2 = screen.getByAltText(/Test Project detail 2/i);
        expect(detail1).toBeInTheDocument();
        expect(detail2).toBeInTheDocument();
        expect(detail1).toHaveAttribute('src', '/test-detail-1.jpg');
        expect(detail2).toHaveAttribute('src', '/test-detail-2.jpg');

        // Ensure the hero image is NOT repeated as a detail image
        const allImages = screen.getAllByRole('img');
        const imagesWithHeroSrc = allImages.filter(img =>
            img.getAttribute('src') === '/test-hero.jpg'
        );

        // Should only be 1 (the hero image at the top)
        expect(imagesWithHeroSrc.length).toBe(1);
    });

    it('should render 404 state if project is not found', () => {
        render(
            <MemoryRouter initialEntries={['/projects/non-existent']}>
                <Routes>
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Project Not Found/i)).toBeInTheDocument();
    });
});
