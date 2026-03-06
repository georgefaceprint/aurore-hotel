'use client';
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export default function FamilyTree({ data }) {
    const svgRef = useRef(null);
    const wrapperRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!data || !wrapperRef.current) return;

        const width = wrapperRef.current.clientWidth || 800;
        const height = window.innerWidth < 768 ? 400 : 600; // Smaller height on mobile

        const svg = d3.select(svgRef.current)
            .attr('width', '100%')
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .style('background', 'var(--card, #1a1a1a)')
            .style('border-radius', '16px')
            .style('box-shadow', '0 8px 32px rgba(0,0,0,0.2)');

        svg.selectAll('*').remove();

        const g = svg.append('g');

        const zoom = d3.zoom()
            .scaleExtent([0.1, 3])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoom);

        // Dynamic spacing based on screen size
        const nodeW = 160;
        const nodeH = 60;
        const xSpacing = window.innerWidth < 768 ? 160 : 220;
        const ySpacing = 80;

        const tree = d3.tree().nodeSize([ySpacing, xSpacing]);
        const root = d3.hierarchy(data);
        tree(root);

        // Center the tree layout (Horizontal tree)
        const xOffset = window.innerWidth < 768 ? width / 3 : width / 4;
        const yOffset = height / 2;

        // Initial zoom to fit
        const initialScale = window.innerWidth < 768 ? 0.6 : 0.8;
        svg.call(zoom.transform, d3.zoomIdentity.translate(xOffset, yOffset).scale(initialScale));

        // Links
        const linkGenerator = d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x);

        g.selectAll('.link')
            .data(root.links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', linkGenerator)
            .attr('fill', 'none')
            .attr('stroke', 'var(--accent-muted, #444)')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', d => {
                // Dashed line if text includes 'Spouse'
                return d.target.data.name.includes('(Spouse)') ? '6,6' : 'none';
            })
            // Add a subtle shadow to paths
            .style('filter', 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))');

        // Nodes
        const nodes = g.selectAll('.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.y},${d.x})`);

        // Dimensions for node cards
        const cardW = nodeW;
        const cardH = nodeH;

        // Add foreignObject for HTML-like rendering of cards
        const fo = nodes.append('foreignObject')
            .attr('x', -cardW / 2)
            .attr('y', -cardH / 2)
            .attr('width', cardW)
            .attr('height', cardH)
            .style('overflow', 'visible'); // needed for shadows

        // Generate the card content
        fo.append('xhtml:div')
            .style('width', `${cardW}px`)
            .style('height', `${cardH}px`)
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('justify-content', 'center')
            .style('flex-direction', 'column')
            .style('background', d => {
                if (searchTerm && d.data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return 'var(--accent, #3b82f6)';
                }
                // Root node styling
                if (d.depth === 0) return '#2a2a2a';
                return '#1f1f1f';
            })
            .style('border', d => {
                if (searchTerm && d.data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return '2px solid white';
                }
                if (d.depth === 0) return '2px solid var(--accent, #3b82f6)';
                return '1px solid #333';
            })
            .style('border-radius', '12px')
            .style('color', '#fff')
            .style('font-family', 'var(--font-inter), system-ui, sans-serif')
            .style('font-size', '14px')
            .style('box-shadow', d => {
                if (searchTerm && d.data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return '0 0 20px rgba(59, 130, 246, 0.6)';
                }
                return '0 4px 12px rgba(0,0,0,0.4)';
            })
            .style('padding', '6px 12px')
            .style('box-sizing', 'border-box')
            .style('transition', 'all 0.3s ease')
            .html(d => {
                let mainText = d.data.name;
                let subText = d.depth === 0 ? 'Progenitor' : 'Descendant';

                const match = d.data.name.match(/(.*?)\s*\((.*?)\)/);
                if (match) {
                    mainText = match[1];
                    subText = match[2];
                }

                return `
                     <div style="font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; max-width: 100%; font-size: 14px;">
                        ${mainText}
                     </div>
                     <div style="font-size: 11px; font-weight: 500; opacity: 0.6; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.5px;">
                        ${subText}
                     </div>
                 `;
            });

    }, [data, searchTerm]);

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'var(--font-inter)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--card, #111)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border, #222)' }}>
                <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>Interactive Explorer</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary, #9ca3af)', maxWidth: '400px' }}>
                        Pinch-to-zoom and drag to navigate through generations. Use the search to quickly highlight relatives across the entire lineage.
                    </p>
                </div>
                <div style={{ position: 'relative', flex: '1 1 250px', maxWidth: '300px' }}>
                    <input
                        type="search"
                        placeholder="Search relatives..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 16px 12px 42px',
                            borderRadius: '30px',
                            border: '1px solid var(--border, #333)',
                            background: 'rgba(255,255,255,0.05)',
                            color: '#fff',
                            fontSize: '0.95rem',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box'
                        }}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '18px',
                            height: '18px',
                            color: 'var(--text-secondary, #9ca3af)',
                        }}
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
            </div>

            <div ref={wrapperRef} style={{ width: '100%', position: 'relative' }}>
                <svg ref={svgRef} style={{ display: 'block' }}></svg>
                {/* Mobile overlay indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    background: 'rgba(0,0,0,0.7)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#ddd',
                    fontWeight: '500',
                    pointerEvents: 'none',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    Pinch & Drag
                </div>
            </div>
        </div>
    );
}
