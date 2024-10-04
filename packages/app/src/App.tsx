import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type MockGameStatus = 'waitingForMove' | 'waitingForReveal' | 'completed';

type MockGameMove = 'rock' | 'paper' | 'scissors';

type MockGame = {
  id: number;
  status: MockGameStatus;
  player1: string;
  player2?: string;
  result?: string;
};

// Mock data
const mockGames: MockGame[] = [
  { id: 1, status: 'waitingForMove', player1: '0x123...', player2: '0x456...' },
  {
    id: 2,
    status: 'waitingForReveal',
    player1: '0x123...',
    player2: '0x789...',
  },
  {
    id: 3,
    status: 'completed',
    player1: '0x456...',
    player2: '0x789...',
    result: 'Player 1 wins',
  },
];

const mockStats = { wins: 5, losses: 3, draws: 2 };

function App() {
  const [games, setGames] = React.useState<MockGame[]>(mockGames);
  const [stats, setStats] = React.useState(mockStats);
  const [walletConnected, setWalletConnected] = React.useState(false);
  const [walletAddress, setWalletAddress] = React.useState('');

  const connectWallet = () => {
    // Simulating wallet connection
    setWalletConnected(true);
    setWalletAddress('0x123...');
  };

  const createGame = () => {
    const newGame: MockGame = {
      id: games.length + 1,
      status: 'waitingForMove',
      player1: walletAddress,
    };
    setGames([...games, newGame]);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const chooseMove = (gameId: number, _move: MockGameMove) => {
    setGames(
      games.map((game) =>
        game.id === gameId ? { ...game, status: 'waitingForReveal' } : game
      )
    );
  };

  const revealResult = (gameId: number) => {
    setGames(
      games.map((game) =>
        game.id === gameId
          ? { ...game, status: 'completed', result: 'Player 1 wins' }
          : game
      )
    );
    setStats({ ...stats, wins: stats.wins + 1 });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rock Paper Scissors</h1>

      {!walletConnected ? (
        <Button onClick={connectWallet} className="mb-4">
          Connect Wallet
        </Button>
      ) : (
        <p className="mb-4">Connected: {walletAddress}</p>
      )}

      {walletConnected && (
        <>
          <Button onClick={createGame} className="mb-4">
            Create New Game
          </Button>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Current Games</CardTitle>
            </CardHeader>
            <CardContent>
              {games.map((game) => (
                <div key={game.id} className="mb-2 p-2 border rounded">
                  <p>Game ID: {game.id}</p>
                  <p>Status: {game.status}</p>
                  {game.status === 'waitingForMove' && (
                    <div>
                      <Button
                        onClick={() => chooseMove(game.id, 'rock')}
                        className="mr-2">
                        Rock
                      </Button>
                      <Button
                        onClick={() => chooseMove(game.id, 'paper')}
                        className="mr-2">
                        Paper
                      </Button>
                      <Button onClick={() => chooseMove(game.id, 'scissors')}>
                        Scissors
                      </Button>
                    </div>
                  )}
                  {game.status === 'waitingForReveal' &&
                    game.player1 === walletAddress && (
                      <Button onClick={() => revealResult(game.id)}>
                        Reveal Result
                      </Button>
                    )}
                  {game.status === 'completed' && <p>Result: {game.result}</p>}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Wins: {stats.wins}</p>
              <p>Losses: {stats.losses}</p>
              <p>Draws: {stats.draws}</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default App;
