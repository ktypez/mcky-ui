import { mount } from 'svelte';
import V6Playground from './V6Playground.svelte';
import { applyV6Mode } from '../src/lib/theme';
import '../src/styles/v6.css';

// Resolve the stored mode before the first paint so the backdrop never flashes.
applyV6Mode();
mount(V6Playground, { target: document.getElementById('app')! });
