import React, { useState } from 'react';
import Box from '@mui/material/Box';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { axiosInstanceSnippet, angularServiceSnippet, fetchSnippet } from '../utils/usageSamples';


const UsageSamples: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [copied, setCopied] = useState<string | null>(null);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    setCopied(null);
  };

  const snippets = [
    { label: 'Axios', snippet: axiosInstanceSnippet },
    { label: 'Angular', snippet: angularServiceSnippet },
    { label: 'Fetch', snippet: fetchSnippet },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 900, margin: 'auto', padding: 2 }}>

      <Tabs value={selectedTab} onChange={handleChange} centered aria-label="code snippet tabs" sx={{position:"sticky", top:"5rem"}}>
        {snippets.map((snippet) => (
          <Tab key={snippet.label} label={snippet.label}   sx={{ height: '48px' }}/>
        ))}
      </Tabs>
      <Box
          component="pre"
          sx={{
            background: '#282C34',
            padding: '2rem 5rem',
            borderRadius: '4px',
            height: '35rem', 
            overflow: 'auto', 
            textAlign:"left",
            color:"#F8F8F2"
          }}
        >
          <code>{snippets[selectedTab].snippet}</code>
        </Box>
      <Box>

        <CopyToClipboard text={snippets[selectedTab].snippet} onCopy={() => setCopied(snippets[selectedTab].label)}>
          <Button variant="outlined" color="secondary" sx={{ mt: 2 }}>
            {copied === snippets[selectedTab].label ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </CopyToClipboard>
      </Box>
    </Box>
  );
};

export default UsageSamples;

