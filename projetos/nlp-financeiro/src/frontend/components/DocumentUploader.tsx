import React from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

interface Props {
  onUpload: (file: File) => void;
  loading: boolean;
}

export const DocumentUploader: React.FC<Props> = ({ onUpload, loading }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        border: '2px dashed',
        borderColor: 'grey.300',
        borderRadius: 2
      }}
    >
      <input
        type="file"
        accept=".txt,.pdf,.doc,.docx"
        style={{ display: 'none' }}
        id="document-upload"
        onChange={handleFileChange}
        disabled={loading}
      />
      <label htmlFor="document-upload">
        <Button
          component="span"
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <CloudUpload />}
          disabled={loading}
        >
          Carregar Documento
        </Button>
      </label>
      <Typography variant="body2" color="text.secondary" mt={2}>
        Suporta arquivos .txt, .pdf, .doc e .docx
      </Typography>
    </Box>
  );
}; 