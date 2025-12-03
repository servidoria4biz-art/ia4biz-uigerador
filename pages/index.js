import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [description, setDescription] = useState('');
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateUI = async () => {
    if (!description.trim()) {
      setError('Por favor, descreva a interface que você quer gerar');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedHTML('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar interface');
      }

      const data = await response.json();
      setGeneratedHTML(data.html);
    } catch (err) {
      setError('Erro ao gerar a interface. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadHTML = () => {
    const blob = new Blob([generatedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interface-gerada.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="IA4BIZ Logo" className={styles.logoImage} />
          <h1 className={styles.title}>IA4BIZ</h1>
          <span className={styles.tagline}>IA for business</span>
        </div>
        <h2 className={styles.subtitle}>Gerador de UI Inteligente</h2>
        <p className={styles.description}>
          Eficiência hoje. Escala amanhã.
        </p>

        <textarea
          className={styles.textarea}
          placeholder="Ex: Crie uma landing page moderna para uma cafeteria com header, seção hero com imagem de fundo, menu de produtos e formulário de contato..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
        />

        <button
          className={styles.button}
          onClick={generateUI}
          disabled={loading}
        >
          {loading ? '⚙️ Gerando Interface...' : '🚀 Gerar Interface'}
        </button>

        {error && <div className={styles.error}>{error}</div>}

        {generatedHTML && (
          <div className={styles.actions}>
            <button className={styles.secondaryButton} onClick={downloadHTML}>
              💾 Baixar HTML
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => setGeneratedHTML('')}
            >
              🗑️ Limpar
            </button>
          </div>
        )}

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Powered by <strong>IA4BIZ</strong>
          </p>
          <p className={styles.footerSubtext}>
            4 Pilares: Automação · Escala · Vendas · Segurança
          </p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.previewHeader}>
          <h2 className={styles.previewTitle}>Preview da Interface</h2>
        </div>

        {!generatedHTML && !loading && (
          <div className={styles.emptyState}>
            <p className={styles.emptyStateText}>
              👈 Descreva sua interface e clique em gerar para ver o preview aqui
            </p>
          </div>
        )}

        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Criando sua interface...</p>
          </div>
        )}

        {generatedHTML && (
          <iframe
            className={styles.iframe}
            srcDoc={generatedHTML}
            title="Preview"
            sandbox="allow-scripts"
          />
        )}
      </div>
    </div>
  );
}
