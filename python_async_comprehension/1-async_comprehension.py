from async_generator import async_generator  # Adjusted import to absolute path

async def async_comprehension():
    """Collects 10 random numbers from async_generator using async comprehension."""
    return [number async for number in async_generator()]
