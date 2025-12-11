import React, { useState, useMemo } from 'react';
import rawColorData from './colorData.json';

function App() {
  const [currentTab, setCurrentTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [familyFilter, setFamilyFilter] = useState('');
  const [sortBy, setSortBy] = useState('usage');

  // Convert compact array format to objects
  const colors = useMemo(() => {
    let data = rawColorData.map(([hex, usage, type, token, dist, family]) => ({
      hex,
      usage_count: usage,
      match_type: type,
      matched_token: token,
      distance: dist,
      family
    }));

    // Filter by tab
    if (currentTab !== 'all') {
      data = data.filter(c => c.match_type === currentTab);
    }

    // Filter by family
    if (familyFilter) {
      data = data.filter(c => c.family === familyFilter);
    }

    // Filter by search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(c =>
        c.hex.toLowerCase().includes(term) ||
        c.family.toLowerCase().includes(term) ||
        c.matched_token.toLowerCase().includes(term)
      );
    }

    // Sort
    data.sort((a, b) => {
      switch (sortBy) {
        case 'usage':
          return b.usage_count - a.usage_count;
        case 'distance':
          return a.distance - b.distance;
        case 'family':
          return a.family.localeCompare(b.family);
        case 'hex':
          return a.hex.localeCompare(b.hex);
        default:
          return 0;
      }
    });

    return data;
  }, [currentTab, searchTerm, familyFilter, sortBy]);

  // Get unique families
  const families = useMemo(() => {
    const set = new Set(rawColorData.map(d => d[5]));
    return [...set].sort();
  }, []);

  const getMatchIcon = (type) => {
    switch (type) {
      case 'exact':
        return '✓';
      case 'similar':
        return '≈';
      case 'unmatched':
        return '✗';
      default:
        return '';
    }
  };

  const getMatchLabel = (type) => {
    switch (type) {
      case 'exact':
        return 'Exact Match';
      case 'similar':
        return 'Similar';
      case 'unmatched':
        return 'Unmatched';
      default:
        return '';
    }
  };

  const getRec = (color) => {
    if (color.match_type === 'exact') return 'Already using token';
    if (color.match_type === 'similar') return `Replace with ${color.matched_token}`;
    return 'No close match';
  };

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#f8f9fa',
        minHeight: '100vh',
        padding: '20px'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: '20px'
          }}
        >
          <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 10px 0' }}>
            🎨 Color Token Dashboard
          </h1>
          <p style={{ color: '#666', margin: '0 0 20px 0' }}>
            Visual representation of all 620 colors
          </p>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '15px',
              marginTop: '20px'
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '15px',
                borderRadius: '8px',
                color: 'white'
              }}
            >
              <div style={{ fontSize: '28px', fontWeight: '700' }}>620</div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>Total Colors</div>
            </div>
            <div
              style={{
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                padding: '15px',
                borderRadius: '8px',
                color: 'white'
              }}
            >
              <div style={{ fontSize: '28px', fontWeight: '700' }}>85</div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>Exact</div>
            </div>
            <div
              style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                padding: '15px',
                borderRadius: '8px',
                color: 'white'
              }}
            >
              <div style={{ fontSize: '28px', fontWeight: '700' }}>323</div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>Similar</div>
            </div>
            <div
              style={{
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                padding: '15px',
                borderRadius: '8px',
                color: 'white'
              }}
            >
              <div style={{ fontSize: '28px', fontWeight: '700' }}>212</div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>Unmatched</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div
          style={{
            background: 'white',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: '15px',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap'
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search by hex or family..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '10px 15px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
          <select
            value={familyFilter}
            onChange={(e) => setFamilyFilter(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="">All Families</option>
            {families.map(f => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="usage">Sort by Usage</option>
            <option value="distance">Sort by Distance</option>
            <option value="family">Sort by Family</option>
            <option value="hex">Sort by Hex</option>
          </select>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '15px',
            flexWrap: 'wrap'
          }}
        >
          {[
            ['all', 'All Colors', 620],
            ['exact', 'Exact', 85],
            ['similar', 'Similar', 323],
            ['unmatched', 'Unmatched', 212]
          ].map(([value, label, count]) => (
            <button
              key={value}
              onClick={() => setCurrentTab(value)}
              style={{
                padding: '10px 20px',
                background: currentTab === value ? '#667eea' : 'white',
                color: currentTab === value ? 'white' : '#333',
                border: '2px solid',
                borderColor: currentTab === value ? '#667eea' : '#e0e0e0',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Results info */}
        <div
          style={{
            background: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            marginBottom: '15px',
            fontSize: '14px',
            color: '#666'
          }}
        >
          Showing {colors.length} of 620 colors
        </div>

        {/* Color Grid */}
        <div style={{ display: 'grid', gap: '15px' }}>
          {colors.map((color, idx) => {
            const currentHex = color.hex.length > 7 ? color.hex.substring(0, 7) : color.hex;
            const tokenHex =
              color.matched_token.length > 7
                ? color.matched_token.substring(0, 7)
                : color.matched_token;

            return (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '15px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto 1fr',
                  gap: '15px',
                  alignItems: 'center'
                }}
              >
                {/* Current Color */}
                <div>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: '600',
                      color: '#999',
                      textTransform: 'uppercase',
                      marginBottom: '8px'
                    }}
                  >
                    Current
                  </div>
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      border: '3px solid #f0f0f0',
                      background: currentHex
                    }}
                  ></div>
                </div>

                {/* Color Info */}
                <div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Monaco, monospace',
                      marginBottom: '5px'
                    }}
                  >
                    {color.hex}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '5px',
                        fontSize: '11px',
                        fontWeight: '600',
                        background: '#e3f2fd',
                        color: '#1976d2'
                      }}
                    >
                      {color.family}
                    </span>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '5px',
                        fontSize: '11px',
                        fontWeight: '600',
                        background: '#f3e5f5',
                        color: '#7b1fa2'
                      }}
                    >
                      {color.usage_count} uses
                    </span>
                    {color.distance > 0 && (
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '5px',
                          fontSize: '11px',
                          fontWeight: '600',
                          background: '#f0f0f0',
                          color: '#666'
                        }}
                      >
                        Δ {color.distance.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Match Indicator */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '0 15px'
                  }}
                >
                  <div style={{ fontSize: '20px', color: '#667eea' }}>→</div>
                  <div
                    style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      background:
                        color.match_type === 'exact'
                          ? '#d1fae5'
                          : color.match_type === 'similar'
                          ? '#fef3c7'
                          : '#fee2e2',
                      color:
                        color.match_type === 'exact'
                          ? '#047857'
                          : color.match_type === 'similar'
                          ? '#d97706'
                          : '#dc2626'
                    }}
                  >
                    {getMatchIcon(color.match_type)}
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: '600',
                      textAlign: 'center',
                      color:
                        color.match_type === 'exact'
                          ? '#047857'
                          : color.match_type === 'similar'
                          ? '#d97706'
                          : '#dc2626'
                    }}
                  >
                    {getMatchLabel(color.match_type)}
                  </div>
                </div>

                {/* Token Color */}
                <div>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: '600',
                      color: '#999',
                      textTransform: 'uppercase',
                      marginBottom: '8px'
                    }}
                  >
                    {color.match_type === 'exact' ? 'Token' : 'Recommended'}
                  </div>
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      border: '3px solid #f0f0f0',
                      background: tokenHex
                    }}
                  ></div>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: 'Monaco, monospace',
                      marginTop: '5px'
                    }}
                  >
                    {color.matched_token}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#666',
                      fontStyle: 'italic',
                      marginTop: '3px'
                    }}
                  >
                    {getRec(color)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {colors.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px',
              color: '#999',
              fontSize: '16px'
            }}
          >
            No colors match your filters
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
