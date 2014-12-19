<?php
class Database
{
	private function verify($table, $content)
	{
		foreach ($table as $field)
		{
			if (!isset($content[$field]))
			{
				die("Doesn't have ".$field."!");
				return false;
			}
		}

		return true;
	}

	private $nextIndex = [];

	public function __construct($root)
	{
		$this->root = $root;
		$this->schema = json_decode(file_get_contents("$root/schema.json"));

		foreach($this->schema->tables as $table=>$fields)
		{
			$dir = "$root/$table";

			if (!file_exists($dir))
			{
				mkdir("$root/$table");
				file_put_contents("$dir/index", "1");
			}

			if (!file_exists("$dir.blob"))
			{
				mkdir ("$dir.blob");
			}

			$this->nextIndex[$table] = file_get_contents("$dir/index");
		}
	}

	public function getNextIndex($table)
	{
		return $this->nextIndex[$table];
	}

	public function pushFile($table, $content)
	{
		if (!$this->verify($this->schema->tables->$table, $content))
			return false;

		$index = $this->nextIndex[$table]++;

		file_put_contents("$this->root/$table/$index", json_encode($content));
		file_put_contents("$this->root/$table/index", $index+1);

		return $index;
	}

	public function pushBlob($table, $blob, $content)
	{
		$index = $this->pushFile($table, $blob, $content);

		$blobDir = "$this->root/$table.blob";
		file_put_contents("$blobDir/$index");

		return $index;
	}

	public function getFile($table, $index)
	{
		$fileName = "$this->root/$table/$index";
		$file = json_decode(file_get_contents($fileName));
		$file->index = $index;

		return $file;
	}

	public function getFiles($table)
	{
		$indexes = scandir("$this->root/$table");

		$result = [];

		foreach ($indexes as $index)
		{
			if (!is_numeric($index))
				continue;

			$file = $this->getFile($table, $index);
			$result[$index] = $file;
		}

		return $result;
	}

	public function getBlob($table, $index)
	{
		$result = $this->getFile($table, $index);
		$fileName = "$this->root/$table.blob/$index";

		$result->content = file_get_contents($fileName);

		return $result;
	}

	public function getBlobs($table)
	{
		$files = $this->getFiles($table);

		foreach ($files as $file)
		{
			$fileName = "$this->root/$table.blob/$file";
			$file->content = file_get_contents($fileName);
		}

		return $files;
	}

	public function updateFile($table, $index, $content)
	{
		$fileName = "$this->root/$table/$index";
		$original = json_decode(file_get_contents($fileName));

		foreach($content as $key=>$val)
		{
			$original->$key = $val;
		}

		file_put_contents($fileName, json_encode($original));
	}

	public function deleteFile($table, $index)
	{
		unlink("$this->root/$table/$index");
	}

	public function deleteBlob($table, $index)
	{
		$this->deleteFile($table, $index);
		unlink("$this->root/$table/$index");
	}
}
